const mongoose = require('mongoose');
const config = require('../../config/database');
const Schema = require('mongoose').Schema;

const patientSchema = mongoose.Schema({
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

const Patient = module.exports = mongoose.model("Patient", patientSchema);

module.exports.fillUser = async function (id) {
  try {
    const query = { '_id': id }
    return await this.findOne(query).populate('userId');
  } catch (error) { throw error; }
}

module.exports.addPatient = async function (newPatient) {
  try {
    let patient = await newPatient.save();
    patient = await this.fillUser(patient._id);
    let response = {
      status: true,
      values: patient
    }
    return response;
  } catch (error) { throw error; }
}
module.exports.addQuestion = async function (pId, qId) {
  try {
    const query = { '_id': pId };
    let patient = await this.findOne(query);
    patient.questionsId.push(qId);
    patient = await patient.save();
    if (patient) {
      return true;
    } else {
      throw new Error('Cannot add answer to doctor');
    }
  } catch (error) { throw error; }
}
module.exports.addMH = async function (pId, mhId) {
  try {
    const query = { '_id': pId };
    let patient = await this.findOne(query);
    patient.mhsId.push(mhId);
    patient = await patient.save();
    if (patient) {
      return true;
    } else {
      throw new Error('Cannot add appointment to patient');
    }
  } catch (error) { throw error; }
}
module.exports.addAppointment = async function (pId, aId) {
  try {
    const query = { '_id': pId };
    let patient = await this.findOne(query);
    patient.appointments.push(aId);
    patient = await patient.save();
    if (patient) {
      return true;
    } else {
      throw new Error('Cannot add appointment to patient');
    }
  } catch (error) { throw error; }
}
module.exports.getPatients = async function () {
  try {
    const query = {};
    let patients = await this.find(query)
      .populate({ path: 'questionsId', populate: 'answerId' })
      //        .populate('mhsId')
      .populate('appointments');
      let response = {
        status: true,
        values: patients
      }
      return patients;  
    } catch (error) { throw error; }
}
module.exports.getPatient = async function (pId) {
  try {
    const query = { '_id': pId };
    let patient = await this.findOne(query)
      .populate({ path: 'questionsId', populate: 'answerId' })
      //        .populate('mhsId')
      .populate('appointmentsId')
      .populate('userId');
      let response = {
        status: true,
        values: patient
      }
      return response;
  } catch (error) { throw error; }
}