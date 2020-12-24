const express = require('express');
const reservasRouter = express.Router();
const auth = require("../../users/auth/auth");
const Appointment = require('../models/appointment');
   

reservasRouter.get('/doctor/:doctorId', auth, async (req, res) => {
	try {
		const doctorId = req.params.doctorId;
		const response = await Appointment.getAppointmentsByDoctor(doctorId);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


reservasRouter.get('/patient/:patientId', auth, async (req, res) => {
	try {
		const patientId = req.params.patientId;
		console.log(patientId)
		const response = await Appointment.getAppointmentsByPatient(patientId);
		console.log(response)
		/* if (appointments && appointments.length) {
		} else {
			throw ('There are not appointments for this patient')
		} */
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});



reservasRouter.post('/', auth, async (req, res) => {
	try {

		let fecha = req.body.fecha;
		let hora = req.body.hora;

		let date = new Date(fecha+" "+hora);
		const appointment = {
			patientId: req.body.patientId,
			doctorId: req.body.doctorId,
			info: req.body.info,
			initDate: date,
			length: req.body.length
		};
		let newAppointment = new Appointment(appointment);
		response = await Appointment.addAppointment(newAppointment);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


reservasRouter.put('/:appointmentId', auth, async (req, res) => {
	try {
		const appointmentId = req.params.appointmentId;
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});



reservasRouter.delete('/', auth, async (req, res) => {
	try {
		const item = req.query.item;
		let response = await Appointment.removeAppointment(item);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


reservasRouter.get('/all', auth, async (req, res) => {
	try {
		let response = await Appointment.getAppointments();
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

module.exports = reservasRouter;