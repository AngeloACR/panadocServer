const express = require('express');
const userRouter = express.Router();
const auth = require("../auth/auth");
const User = require('../models/user');
const Doctor = require('../models/doctor');

userRouter.post('/', /*auth,*/ async (req, res) => {
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
		const doctor = {
			userId: response.values._id,
			speciality: req.body.speciality,
			summary: req.body.summary,
			experience: req.body.experience,
			addr: req.body.addr,
		};	
		console.log(doctor);
		let newDoctor = new Doctor(doctor);
		console.log(newDoctor);
		newDoctor = await Doctor.addDoctor(newDoctor);
		const msg = ` ${req.originalUrl} ${JSON.stringify(newDoctor)}`;
		res.status(200).json(newDoctor);
	}	
	catch (e) {
		res.status(400).json(e.toString());
	}	
});	


userRouter.get('/all', /*auth,*/ async (req, res) => {
	try {
		let response = await Doctor.getDoctors();
		if (response.values && response.values.length) {
		} else {
			throw new Error('There are no doctors')
		}
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


userRouter.get('/:doctorId', /*auth,*/ async (req, res) => {
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
userRouter.delete('/', auth, async (req, res, next) => {
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
userRouter.put('/', auth, async (req, res, next) => {
	try {
		const user = req.user;
		const updateData = req.body.updateData;

		let response = await User.updateUser(updateData);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}


});

// Get User
userRouter.get('/', auth, async (req, res, next) => {
	return res.json({
		user: req.user
	});
});

userRouter.get('/all', auth, async (req, res, next) => {
	try {

		let response = await User.getUsers();
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}

});

module.exports = userRouter;