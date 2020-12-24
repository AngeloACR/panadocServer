const express = require('express');
const doctorRouter = express.Router();
const auth = require("../auth/auth");
const User = require('../models/user');
const Doctor = require('../models/doctor');

doctorRouter.post('/', /*auth,*/ async (req, res) => {
	try {
		const user = {
			username: req.body.username,
			name: req.body.name,
			mail: req.body.mail,
			password: req.body.password,
			type: req.body.type,
		};
		let newUser = new User(user)
		let response = await User.addUser(newUser);
		if(response.status){
			const doctor = {
				userId: response.values._id,
				speciality: req.body.speciality,
				summary: req.body.summary,
				experience: req.body.experience,
				addr: req.body.addr,
			};	
			let newDoctor = new Doctor(doctor);
			response = await Doctor.addDoctor(newDoctor);
		}
		res.status(200).json(response);
	}	
	catch (e) {
		res.status(400).json(e.toString());
	}	
});	


doctorRouter.get('/all', /*auth,*/ async (req, res) => {
	try {
		let response = await Doctor.getDoctors();
		/* if (response.values && response.values.length) {
		} else {
			throw new Error('There are no doctors')
		} */
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


doctorRouter.get('/:doctorId', /*auth,*/ async (req, res) => {
	try {
		const doctorId = req.params.doctorId;
		const doctor = await Doctor.getDoctor(doctorId);
		const msg = ` ${req.originalUrl} `;
		sendOk(msg, res, doctor)
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

// Delete user
doctorRouter.delete('/', auth, async (req, res, next) => {
	try {

		const item = req.query.item;

		let response = await Doctor.deleteDoctor(item);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

// Update user, NEED TO IMPROVE
doctorRouter.put('/', auth, async (req, res, next) => {
	try {
		const updateData = req.body;

		let response = await Doctor.updateDoctor(updateData);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}


});

module.exports = doctorRouter;