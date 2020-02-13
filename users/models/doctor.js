const mongoose = require('mongoose');
const config = require('../../config/database');
const Schema = require('mongoose').Schema;

const doctorSchema = mongoose.Schema({
  userId: {
/*     type: String,
    ref: 'User' */
    type: Schema.Types.ObjectId,
    ref:'User'    
  },
  speciality: {
    type: String,
    //    ref: 'Speciality',
  },
  summary: {
    type: String,
  },
  experience: {
    type: String,
  },
  addr: {
    type: String,
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
    return await this.findOne(query)
    .populate({ path: 'userId', select: 'username mail type name' });
  } catch (error) { throw error; }
}

module.exports.addDoctor = async function (newDoctor) {
  try {
    let doctor = await newDoctor.save();
//    doctor = await this.fillUser(doctor._id);
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
    .populate({ path: 'userId', select: 'username mail type name' })
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
//      .populate({ path: 'questionsId', populate: 'answerId' })
      //        .populate('mhsId')
      //        .populate('reviewsId')
  //    .populate('appointmentsId')
  .populate({ path: 'userId', select: 'username mail type name' })
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