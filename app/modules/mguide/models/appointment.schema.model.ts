import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Appointment as AP} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface AppointmentDoc extends AP, Document { 
  // declare any instance methods here
  getLength(date1: Date, date2: Date);
}

export interface AppointmentModel extends Model<AppointmentDoc> {
  // declare any static methods here
  addAppointment(newAppointment: AppointmentDoc); // this should be changed to the correct return type if possible.
  getAppointmentsByPatient(patientId: string)
  getAppointmentsByDoctor(doctorId: string)
  isAvailable(doctorId: number, patientId: number, initDate: Date);
  removeAppointment(aid: Schema.Types.ObjectId);
}
const appointmentSchema: Schema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor',
  },
  initDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  length: {
    type: Number,
    required: true,
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
appointmentSchema.methods = {
  isAvailable: async function (doctorId: number, patientId: number, initDate: Date) {
    try {
      const queryA = {
        'doctorId': doctorId,
        'initDate': initDate,
      };
      let appointment = await this.findOne(queryA);
      if(!appointment){
        const queryB = {
          'patientId': patientId,
          'initDate': initDate,
        };
        appointment = await this.findOne(queryB);
        if(!appointment){
          return true;
        } else{
          throw new Error('Patient is not available');
        }
      } else{
        throw new Error('Doctor is not available')
      }
    } catch (error) {throw error}
  },
  getLength: async function(date1: Date, date2: Date){
    try{
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60)); 
      return diffDays;
    }catch(e){
      throw e;
    }
  }
};

appointmentSchema.statics = {
  addAppointment: async function (newAppointment: AppointmentDoc) {
    try {
      const isAvailable = await this.isAvailable(newAppointment.doctorId, newAppointment.patientId, newAppointment.initDate);
      if(isAvailable){
        let length = await newAppointment.getLength(newAppointment['initDate'], newAppointment['finishDate'])
        newAppointment.length = length;
        let appointment = await newAppointment.save();
        appointment = await this.fillChilds(appointment._id);
        return appointment
      }
    } catch (error) { 
      throw error;
    }
  },
  fillChilds: async function(aId: Schema.Types.ObjectId){
      const query = {'_id': aId}
      let appointment = await this.findOne(query).populate('patientId').populate('doctorId');
      appointment.patientId['appointmenstId'].push(appointment._id);
      appointment.doctorId['appointmenstId'].push(appointment._id);
      let patient = appointment.patientId.save();
      let doctor = appointment.doctorId.save();
      return appointment;
  },
  getAppointmentsByDoctor: async function(doctorId: string){
    try{
      const query = {'doctorId': doctorId};
      return await this.find(query);
    }catch(e){
      throw e;
    }
  },
  getAppointmentsByPatient: async function(patientId: string){
    try{
      const query = {'patientId': patientId};
      return await this.find(query);
    }catch(e){
      throw e;
    }
  },
  removeAppointment: async function(aid: Schema.Types.ObjectId){
    try{
      const query = {'_id': aid};
      let appointment = await this.findOne(query)
        .populate({path: 'patientId', select: 'appointments'})
        .populate({path: 'doctorId', select: 'appointments'});
      
      const indexP = appointment.patientId.appointments.indexOf(aid, 0);
      if (indexP > -1) {
        appointment.patientId.appointments.splice(indexP, 1);
      }
      appointment.patientId.save();

      const indexD = appointment.doctorId.appointments.indexOf(aid, 0);
      if (indexD > -1) {
        appointment.doctorId.appointments.splice(indexD, 1);
      }
      appointment.doctorId.save();
      
      return await appointment.remove();;
    } catch(e){
      throw e;
    }
  },
};
export const Appointment: AppointmentModel = model<AppointmentDoc, AppointmentModel>("Appointment", appointmentSchema);
export default Appointment;