const express = require('express');
const askadocRouter = express.Router();
const auth = require("../../users/auth/auth");
const Question = require('../models/question');
const Answer = require('../models/answer');
const Patient = require('../../clinica/models/patient');
const Doctor = require('../../clinica/models/doctor');



askadocRouter.post('/', async (req, res) => {
	try {

		const question = {
			askerId: req.body.askerId,
			title: req.body.title,
			details: req.body.details,
		}
		response = await Question.addQuestion(newQuestion);
		if (question.askerId) {
			let added = await Patient.addQuestion(question.askerId, newQuestion._id);
		}

		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


askadocRouter.put('/:questionId', auth, async (req, res) => {
	try {
		const questionId = req.params.questionId;
		const doctorId = req.body.doctorId;
		const text = req.body.text;
		const answer = {
			doctorId: doctorId,
			questionId: questionId,
			date: Date.now(),
			text: text,
		}
		let response = await Answer.addAnswer(answer);
		let question = await Answer.fillDoctor(questionId, response.answer._id)
		let added = await Doctor.fillQuestion(doctorId, question._id);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

askadocRouter.get('/unanswered', auth, async (req, res) => {
	try {
		let response = await Question.getQuestions(false)

		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

askadocRouter.get('/answered', auth, async (req, res) => {
	try {
		let response = await Question.getQuestions(true)

		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

askadocRouter.get('/answered/:doctorId', auth, async (req, res) => {
	try {
		const doctorId = req.params.doctorId;
		let response = await Answer.getAnswersByDoctor(doctorId)
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

askadocRouter.delete('/answer/:answerId', auth, async (req, res) => {
	try {
		const answerId = req.params.answerId;
		let response = await Answer.removeAnswer(answerId);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

askadocRouter.delete('/question/:questionId', auth, async (req, res) => {
	try {
		const questionId = req.params.questionId;
		let response = await Question.removeQuestion(questionId)
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


module.exports = askadocRouter;