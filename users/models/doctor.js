const mongoose = require('mongoose');
const config = require('../../config/database');
const Schema = require('mongoose').Schema;

const doctorSchema = mongoose.Schema({
  username: {
/*     type: String,
    ref: 'User' */
    type: Schema.Types.ObjectId,
    ref:'User'    
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

const Doctor = module.exports = mongoose.model("Doctor", doctorSchema);

module.exports.fillUser = async function (id) {
  try {
    const query = { '_id': id }
    return await this.findOne(query).populate('userId');
  } catch (error) { throw error; }
}

module.exports.addDoctor = async function (newDoctor) {
  try {
    let doctor = await newDoctor.save();
    doctor = await this.fillUser(doctor._id);
    console.log(doctor);
    let response = {
      status: true,
      values: doctor
    }
    return response;
  } catch (error) { throw error; }
}

module.exports.getDoctors = async function () {
  try {
    const query = {};
    let doctors = await this.find(query)
      //.populate({ path: 'questionsId', populate: 'answerId' })
      //        .populate('mhsId')
      //        .populate('reviewsId')
      //.populate('appointments');
    let response = {
      status: true,
      values: doctors
    }
    return response;
  } catch (error) { throw error; }
}
module.exports.getDoctor = async function (dId) {
  try {
    const query = { '_id': dId };
    let doctor = await this.findOne(query)
      .populate({ path: 'questionsId', populate: 'answerId' })
      //        .populate('mhsId')
      //        .populate('reviewsId')
      .populate('appointmentsId')
      .populate('userId');
    let response = {
      status: true,
      values: doctor
    }
    return response;
  } catch (error) { throw error; }
}
module.exports.addQuestion = async function (dId, qId) {
  try {
    const query = { '_id': dId };
    let doctor = await this.findOne(query);
    doctor.questionsId.push(qId);
    doctor = await doctor.save();
    if (doctor) {
      return true;
    } else {
      throw new Error('Cannot add answer to doctor');
    }
  } catch (error) { throw error; }
}
module.exports.addMH = async function (dId, mhId) {
  try {
    const query = { '_id': dId };
    let doctor = await this.findOne(query);
    doctor.mhsId.push(mhId);
    doctor = await doctor.save();
    if (doctor) {
      return true;
    } else {
      throw new Error('Cannot add appointment to doctor');
    }
  } catch (error) { throw error; }
}
module.exports.addAppointment = async function (dId, aId) {
  try {
    const query = { '_id': dId };
    let doctor = await this.findOne(query);
    doctor.appointments.push(aId);
    doctor = await doctor.save();
    if (doctor) {
      return true;
    } else {
      throw new Error('Cannot add appointment to doctor');
    }
  } catch (error) { throw error; }
}