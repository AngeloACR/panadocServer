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
    default: [],
  }],
  appointmentsId: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
    default: [],
  }],
  questionsId: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    default: [],
  }],
});

const Patient = module.exports = mongoose.model("Patient", patientSchema);

module.exports.deletePatient = async function (id) {
    try {
        const query = { "_id": id };
        return await this.findOneAndRemove(query);
    } catch (error) {
        throw error;
    }
}

module.exports.fillUser = async function (id) {
  try {
    const query = { '_id': id }
    let patient = await this.findOne(query).populate('userId');
    patient.userId['patientId'] = id;
    let user = patient.userId.save();
    return patient
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
      throw new Error('No se pudo reservar la cita, intente de nuevo');
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
      throw new Error('No se pudo reservar la cita, intente de nuevo');
    }
  } catch (error) { throw error; }
}
module.exports.getPatients = async function () {
  try {
    const query = {};
    let patients = await this.find(query)
      .populate({ path: 'userId', select: 'username mail type name' })
    //.populate({ path: 'questionsId', populate: 'answerId' })
    //        .populate('mhsId')
    //.populate('appointments');
    let response = {
      status: true,
      values: patients
    }
    return response;
  } catch (error) { throw error; }
}
module.exports.getPatient = async function (pId) {
  try {
    const query = { '_id': pId };
    let patient = await this.findOne(query)
      //      .populate({ path: 'questionsId', populate: 'answerId' })
      //        .populate('mhsId')
      //   .populate('appointmentsId')
      .populate({ path: 'userId', select: 'username mail type name' })
    let response = {
      status: true,
      values: patient
    }
    return response;
  } catch (error) { throw error; }
}

module.exports.updatePatient = async function (data) {
    try {
        const query = { 'userId': data.id }
        let patient = await this.findOne(query)
        .populate('userId');
        patient.userId.name = data.name;
        let username = data.username
        if(username != patient.userId.username){
          let user = await this.findOne({ "username": data.username });
          if (user) {
              throw new Error('Nombre de usuario no disponible');
          }
          patient.userId.username = data.username;
        }
        let user = await patient.userId.save();
        let response = {
            status: true,
            values: user
        }
        return response

    } catch (error) {
                let response = {
            status: false,
            msg: error.toString().replace("Error: ", "")
        }
        return response
    }
}