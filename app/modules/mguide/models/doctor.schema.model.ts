import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Doctor as DC, Review} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface DoctorDoc extends DC, Document { 
  // declare any instance methods here

}

export interface DoctorModel extends Model<DoctorDoc> {
  // declare any static methods here
  addDoctor(newDoctor: DoctorDoc); // this should be changed to the correct return type if possible.
  getDoctors();
  getDoctor(dId: String);
  addMH(dId: String, mhId: Schema.Types.ObjectId);
  addQuestion(dId: String, qId: Schema.Types.ObjectId);
  addAppointment(dId: String, aId: Schema.Types.ObjectId);
}

const doctorSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  speciality: {
    type: String,
    required: true,
//    ref: 'Speciality',
  },
  summary: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  addr: {
    type: String,
    required: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
  }],
  questionsId: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
  }],
  mhsId: [{
    type: Schema.Types.ObjectId,
    ref: 'MH',
  }],
  likes: {
    type: Number,
  },
  likesPerc: {
    type: Number,
  },
});

/**
 * Methods
 */
const updateOptions = {
  multi: true,
  safe: true,
  runValidators: true,
  upsert: true
};
doctorSchema.methods = {
  fillUser: async function (id: string) {
    try {
      const query = {'_id': id}
     return await this.findOne(query).populate('userId');
    } catch (error) {throw error;}
  },
};

doctorSchema.statics = {
  addDoctor: async function (newDoctor: DoctorDoc) {
    try {
      let doctor = await newDoctor.save();
      doctor = await this.fillUser(doctor._id);
      return doctor;
    } catch (error) {throw error;}
  },
  getDoctors: async function(){
    try{
      const query = {};
      let doctors = await this.find(query)
        .populate({path: 'questionsId', populate: 'answerId'})
//        .populate('mhsId')
//        .populate('reviewsId')
        .populate('appointments');
      return doctors;
    }catch (error){throw error;}
  },
  getDoctor: async function(dId: String){
    try{
      const query = {'_id': dId };
      let doctor = await this.findOne(query)
        .populate({path: 'questionsId', populate: 'answerId'})
//        .populate('mhsId')
//        .populate('reviewsId')
        .populate('appointmentsId')
        .populate('userId');
      return doctor;
    }catch (error){throw error;}
  },
  addQuestion: async function(dId: String, qId: Schema.Types.ObjectId){
    try{
      const query = {'_id': dId };
      let doctor = await this.findOne(query);
      doctor.questionsId.push(qId);
      doctor = await doctor.save();
      if(doctor){
        return true;
      } else {
        throw new Error('Cannot add answer to doctor');
      }
    }catch (error){throw error;}
  },
  addMH: async function(dId: String, mhId: Schema.Types.ObjectId){
    try{
      const query = {'_id': dId };
      let doctor = await this.findOne(query);
      doctor.mhsId.push(mhId);
      doctor = await doctor.save();
      if(doctor){
        return true;
      } else {
        throw new Error('Cannot add appointment to doctor');
      }
    }catch (error){throw error;}
  },
  addAppointment: async function(dId: String, aId: Schema.Types.ObjectId){
    try{
      const query = {'_id': dId };
      let doctor = await this.findOne(query);
      doctor.appointments.push(aId);
      doctor = await doctor.save();
      if(doctor){
        return true;
      } else {
        throw new Error('Cannot add appointment to doctor');
      }
    }catch (error){throw error;}
  },
};

export const Doctor: DoctorModel = model<DoctorDoc, DoctorModel>("Doctor", doctorSchema);
export default Doctor;