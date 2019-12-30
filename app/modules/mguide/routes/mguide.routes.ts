import * as express from 'express';
import { sendOk, sendError} from '../../help';
import { auth } from '../../auth';
import {Patient} from '../models/patient.schema.model';
import {Appointment} from '../models/appointment.schema.model';
import {Doctor} from '../models/doctor.schema.model';
import {Symptom} from '../models/symptom.schema.model';
import {Speciality} from '../models/speciality.schema.model';
import { mockDoctor } from '@panadoc/data';

const router = express.Router();
const addr = "/mguide";

router.post('/symptoms', /*auth,*/ async (req, res) => {
  try {
    const symptoms: string[] = (req.body as string[]);
    sendOk(` ${req.originalUrl} ${JSON.stringify(symptoms)}`, res, symptoms)
  }//FIXME: mock
  catch (e) { sendError(addr, res, e) }
});

router.get('/symptoms', /*auth,*/ async (req, res) => {
  try {
    sendOk(` ${req.originalUrl}`, res, ['Diarrea', "Gripe",
      "Tos",
      "Fiebre",])
  }//FIXME: mock
  
  catch (e) { sendError(addr, res, e) }
});

router.post('/doctor', /*auth,*/ async (req, res) => {
  try {
    const doctor = {
      userId: req.body.userId,
      speciality: req.body.speciality,
      summary: req.body.summary,
      experience: req.body.experience,
      addr: req.body.addr,
    };

    let newDoctor = new Doctor(doctor);
    newDoctor = await Doctor.addDoctor(newDoctor);
    const msg = ` ${req.originalUrl} ${JSON.stringify(newDoctor)}`;
    sendOk(msg, res, newDoctor);
  }
  catch (e) { sendError(addr, res, e) }
});

router.post('/patient', /*auth,*/ async (req, res) => {
  try {
    const patient = {
      userId: req.body.userId,
    };

    let newPatient = new Patient(patient);
    newPatient = await Patient.addPatient(newPatient);
    const msg = ` ${req.originalUrl} ${JSON.stringify(newPatient)}`;
    sendOk(msg, res, newPatient);
  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/patients', /*auth,*/ async (req, res) => {
  try {
    let patients = await Patient.getPatients()
    if (patients && patients.length) {
      const msg = ` ${req.originalUrl} `;
      sendOk(msg, res, patients)
    } else {
      throw new Error('There are no patients')
    }  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/patient/:patientId', /*auth,*/ async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.getPatient(patientId);
    const msg = ` ${req.originalUrl} `;
    sendOk(msg, res, patient)
  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/doctors', /*auth,*/ async (req, res) => {
  try {
    let doctors = await Doctor.getDoctors()
    if (doctors && doctors.length) {
      const msg = ` ${req.originalUrl} `;
      sendOk(msg, res, doctors)
    } else {
      throw new Error('There are no doctors')
    }  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/doctor/:doctorId', /*auth,*/ async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.getDoctor(doctorId);
    const msg = ` ${req.originalUrl} `;
    sendOk(msg, res, doctor)
  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/dAppointments/:doctorId', /*auth,*/ async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const appointments = await Appointment.getAppointmentsByDoctor(doctorId);
    if (appointments && appointments.length) {
      const msg = ` ${req.originalUrl} ${JSON.stringify(appointments)}`;
      sendOk(msg, res, appointments)
    } else {
      throw ('There are no appointments for this doctor')
    }
  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/pAppointments/:patientId', /*auth,*/ async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const appointments = await Appointment.getAppointmentsByPatient(patientId);
    if (appointments && appointments.length) {
      const msg = ` ${req.originalUrl} ${JSON.stringify(appointments)}`;
      sendOk(msg, res, appointments)
    } else {
      throw ('There are not appointments for this patient')
    }

  }
  catch (e) { sendError(addr, res, e) }
});


router.post('/appointment', /*auth,*/ async (req, res) => {
  try {

    const appointment = {
      patientId: req.body.patientId,
      doctorId: req.body.doctorId,
      initDate: req.body.initDate,
      finishDate: req.body.finishDate,
    };

    let newAppointment = new Appointment(appointment);
    newAppointment = await Appointment.addAppointment(newAppointment);
    const msg = ` ${req.originalUrl} ${JSON.stringify(newAppointment)}`;
    sendOk(msg, res, newAppointment);

  }
  catch (e) { 
    sendError(addr, res, e); 
    }
});

router.put('/appointment/:appointmentId', /*auth,*/ async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    sendOk(` ${req.originalUrl} ${appointmentId}`, res, appointmentId)
  }
  catch (e) { sendError(addr, res, e) }
});


router.delete('/appointment/:appointmentId', /*auth,*/ async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    sendOk(` ${req.originalUrl} ${appointmentId}`, res, appointmentId)
  }
  catch (e) { sendError(addr, res, e) }
});

router.post('/review', /*auth,*/ async (req, res) => {
  try {
    const review = req.body;
    sendOk(` ${req.originalUrl} ${JSON.stringify(review)}`, res, review)
  }
  catch (e) { sendError(addr, res, e) }
});

export {
  addr as MGUIDE_ENDPOINT,
  router as MguideRoutes
};