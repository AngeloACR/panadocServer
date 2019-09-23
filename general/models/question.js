const mongoose = require('mongoose');
const config = require('../../config/database');

// Questions Schema
const QuestionSchema = mongoose.Schema({
    qId: String,
    question: String,
    answer: String,
    doctor: String,
    tags: [String],
});

const question = module.exports = mongoose.model('question', MHSchema, 'question');

module.exports.getQuestion = function(qId, callback){
	const query = {qId: qId};
	question.findOne(query, callback);
};

module.exports.getQuestions = function(callback){
	const query = {};
	question.find(query, callback);
};

module.exports.addAnswer = function(answer, doctor, callback){
	const query = {patient: patient};
	question.findOneAndUpdate(query, 
    {  $set: { 
        "doctor": answer.doctor,
        "answer" : answer.answer, 
    }},
	callback);
};

module.exports.createQuestion = function(newQuestion, callback){
	newQuestion.save(callback);
};

