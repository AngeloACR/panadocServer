const mongoose = require('mongoose');
const config = require('../../config/database');
const Schema = require('mongoose').Schema;

const appointmentSchema = mongoose.Schema({
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
    ref: 'User',
  },
  length: {
    type: Number,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
  },
});

const Appointment = module.exports = mongoose.model("Appointment", appointmentSchema);

module.exports.isAvailable = async function (doctorId, patientId, initDate) {
  try {
    const queryA = {
      'doctorId': doctorId,
      'initDate': initDate,
    };
    let appointment = await this.findOne(queryA);
    if (!appointment) {
      const queryB = {
        'patientId': patientId,
        'initDate': initDate,
      };
      appointment = await this.findOne(queryB);
      if (!appointment) {
        return true;
      } else {
        throw new Error('Patient is not available');
      }
    } else {
      throw new Error('Doctor is not available')
    }
  } catch (error) { throw error }
}
module.exports.getLength = async function (date1, date2) {
  try {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60));
    return diffDays;
  } catch (e) {
    throw e;
  }
}

module.exports.getFinalDate = async function (initialDate, length) {
  try {
    const dateInMinutes = initialDate.getMinutes();
    let finalDate = new Date();
    finalDate.setMinutes( dateInMinutes + length );
    return finalDate;
  } catch (e) {
    throw e;
  }
}

module.exports.addAppointment = async function (newAppointment) {
  try {
    const isAvailable = await this.isAvailable(newAppointment.doctorId, newAppointment.patientId, newAppointment.initDate);
    if (isAvailable) {
      let finalDate = await this.getFinalDate(newAppointment['initDate'], newAppointment['length'])
      newAppointment.finalDate = finalDate;
      let appointment = await newAppointment.save();
//      appointment = await this.fillChilds(appointment._id);
      let response = {
        status: true,
        values: appointment
      }
      return response;
    }
  } catch (error) {
    throw error;
  }
}
module.exports.fillChilds = async function (aId) {
  const query = { '_id': aId }
  let appointment = await this.findOne(query).populate('patientId').populate('doctorId');
  appointment.patientId['appointmenstId'].push(appointment._id);
  appointment.doctorId['appointmenstId'].push(appointment._id);
  let patient = appointment.patientId.save();
  let doctor = appointment.doctorId.save();
  return appointment;
}

module.exports.getAppointments = async function () {
  try {
    const query = {};
    let appointments = await this.find(query)
    .populate({ path: 'doctorId', populate: 'userId'})
    .populate({ path: 'patientId', populate: 'userId'})
    console.log(appointments);
    let response = {
      status: true,
      values: appointments
    }
    return response;
  } catch (error) { throw error; }
}

module.exports.getAppointmentsByDoctor = async function (doctorId) {
  try {
    const query = { 'doctorId': doctorId };
    let appointments = await this.find(query);
    let response = {
      status: true,
      values: appointments
    }
    return response;
  } catch (e) {
    throw e;
  }
}
module.exports.getAppointmentsByPatient = async function (patientId) {
  try {
    const query = { 'patientId': patientId };
    let appointments = await this.find(query);
    let response = {
      status: true,
      values: appointments
    }
    return response;
    } catch (e) {
    throw e;
  }
}
module.exports.removeAppointment = async function (aid) {
  try {
    const query = { '_id': aid };
    let appointment = await this.findOne(query)
      .populate({ path: 'patientId', select: 'appointments' })
      .populate({ path: 'doctorId', select: 'appointments' });

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

    let result = await appointment.remove();;
    let response = {
      status: true,
      values: result
    }
    return response;

  } catch (e) {
    throw e;
  }
}

