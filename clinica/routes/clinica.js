const express = require('express');
const clinicaRouter = express.Router();
const auth = require("../../users/auth/auth");
const User = require('../models/mh');
   

clinicaRouter.get('/dAppointments/:doctorId', /*auth,*/ async (req, res) => {
	try {
		const doctorId = req.params.doctorId;
		const appointments = await Appointment.getAppointmentsByDoctor(doctorId);
		if (appointments && appointments.length) {
			const msg = ` ${req.originalUrl} ${JSON.stringify(appointments)}`;
			sendOk(msg, res, appointments)
		} else {
			throw ('There are no appointments for this doctor')
		}
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


clinicaRouter.get('/pAppointments/:patientId', /*auth,*/ async (req, res) => {
	try {
		const patientId = req.params.patientId;
		const appointments = await Appointment.getAppointmentsByPatient(patientId);
		if (appointments && appointments.length) {
			const msg = ` ${req.originalUrl} ${JSON.stringify(appointments)}`;
			sendOk(msg, res, appointments)
		} else {
			throw ('There are not appointments for this patient')
		}
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});



clinicaRouter.post('/appointment', /*auth,*/ async (req, res) => {
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

		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


clinicaRouter.put('/appointment/:appointmentId', /*auth,*/ async (req, res) => {
	try {
		const appointmentId = req.params.appointmentId;
		sendOk(` ${req.originalUrl} ${appointmentId}`, res, appointmentId)
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});



clinicaRouter.delete('/appointment/:appointmentId', /*auth,*/ async (req, res) => {
	try {
		const appointmentId = req.params.appointmentId;
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


clinicaRouter.post('/review', /*auth,*/ async (req, res) => {
	try {
		const review = req.body;
		sendOk(` ${req.originalUrl} ${JSON.stringify(review)}`, res, review)
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


module.exports = clinicaRouter;