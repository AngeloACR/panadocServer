const express = require('express');
const userRouter = express.Router();
const auth = require("../../users/auth/auth");
const User = require('../models/mhj');

//**************************** USER CRUD************************************//
userRouter.post('/', async (req, res) => {
	try {

		const user = {
			username: req.body.username,
			email: req.body.mail,
			password: req.body.password,
			tipo: req.body.tipo,
		};

		let newUser = await User.addUser(user);
		res.status(200).json(newUser);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


// Delete user
userRouter.delete('/', auth, async (req, res, next) => {
	try {

		const id = req.params.id;

		let response = await User.deleteUser(id);
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

userRouter.get('/:tipo', auth, async (req, res, next) => {
	try {

		const tipo = req.params.tipo;

		let response = await User.getUsersByType(tipo);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}

});

module.exports = userRouter;