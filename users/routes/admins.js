const express = require('express');
const adminRouter = express.Router();
const auth = require("../auth/auth");
const User = require('../models/user');
const Patient = require('../models/patient');
const Admin = require('../models/admin');

adminRouter.post('/', /*auth,*/ async (req, res) => {
	try {
		const user = {
			username: req.body.username,
			name: req.body.name,
			mail: req.body.mail,
			password: req.body.password,
			type: req.body.type,
		};
		let newUser = new User(user)
		let userResponse = await User.addUser(newUser);
		if(userResponse.status){
			const patient = {
				userId: userResponse.values._id,
			};
			let newPatient = new Patient(patient);
			let patientResponse = await Patient.addPatient(newPatient);
			const admin = {
				userId: userResponse.values._id,
			};
			let newAdmin = new Admin(admin);
			let adminResponse = await Admin.addAdmin(newAdmin);
		}
		res.status(200).json(userResponse);
	}	
	catch (e) {
		res.status(400).json(e.toString());
	}	
});	


adminRouter.get('/all', auth, async (req, res) => {
	try {
		let response = await Admin.getAdmins();
		/* if (response.values && response.values.length) {
		} else {
			throw new Error('There are no admins')
		} */
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


// Delete user
adminRouter.delete('/', auth, async (req, res, next) => {
	try {

		const item = req.query.item;

		let response = await Admin.deleteAdmin(item);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

// Update user, NEED TO IMPROVE
adminRouter.put('/', auth, async (req, res, next) => {
	try {
		const updateData = req.body;

		let response = await Admin.updateAdmin(updateData);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}


});

module.exports = adminRouter;