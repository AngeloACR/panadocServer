import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Patient as PT} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface PatientDoc extends PT, Document { 
  // declare any instance methods here

}

export interface PatientModel extends Model<PatientDoc> {
  // declare any static methods here
  addPatient(newPatient: PatientDoc); // this should be changed to the correct return type if possible.
  addQuestion(pId: String, qId: Schema.Types.ObjectId);
  addAppointment(pId: String, aId: Schema.Types.ObjectId);
  addMH(pId: String, mhId: Schema.Types.ObjectId);
  getPatients();
  getPatient(pId: String);
}


const patientSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  mhsId: [{
    type: Schema.Types.ObjectId,
    ref: 'MH',
  }],
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
  }],
  questionsId: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
  }],  
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
patientSchema.methods = {
  fillUser: async function (id: string) {
    try {
      const query = {'_id': id}
      return await this.findOne(query).populate('userId');
    } catch (error) {throw error;}
  },};

patientSchema.statics = {
  addPatient: async function (newPatient: PatientDoc) {
    try {
      let patient = await newPatient.save();
      patient = await this.fillUser(patient._id);
      return patient;
    } catch (error) {throw error;}
  },  
  addQuestion: async function(pId: String, qId: Schema.Types.ObjectId){
    try{
      const query = {'_id': pId };
      let patient = await this.findOne(query);
      patient.questionsId.push(qId);
      patient = await patient.save();
      if(patient){
        return true;
      } else {
        throw new Error('Cannot add answer to doctor');
      }
    }catch (error){throw error;}
  },
  addMH: async function(pId: String, mhId: Schema.Types.ObjectId){
    try{
      const query = {'_id': pId };
      let patient = await this.findOne(query);
      patient.mhsId.push(mhId);
      patient = await patient.save();
      if(patient){
        return true;
      } else {
        throw new Error('Cannot add appointment to patient');
      }
    }catch (error){throw error;}
  },
  addAppointment: async function(pId: String, aId: Schema.Types.ObjectId){
    try{
      const query = {'_id': pId };
      let patient = await this.findOne(query);
      patient.appointments.push(aId);
      patient = await patient.save();
      if(patient){
        return true;
      } else {
        throw new Error('Cannot add appointment to patient');
      }
    }catch (error){throw error;}
  },
  getPatients: async function(){
    try{
      const query = {};
      let patients = await this.find(query)
        .populate({path: 'questionsId', populate: 'answerId'})
//        .populate('mhsId')
        .populate('appointments');
      return patients;
    }catch (error){throw error;}
  },
  getPatient: async function(pId: String){
    try{
      const query = {'_id': pId };
      let patient = await this.findOne(query)
        .populate({path: 'questionsId', populate: 'answerId'})
//        .populate('mhsId')
        .populate('appointmentsId')
        .populate('userId');
      return patient;
    }catch (error){throw error;}
  },
};

export const Patient: PatientModel = model<PatientDoc, PatientModel>("Patient", patientSchema);
export default Patient;