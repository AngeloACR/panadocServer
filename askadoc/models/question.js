const mongoose = require('mongoose');
const config = require('../../config/database');
const Schema = require('mongoose').Schema;

// Questions Schema
const questionSchema = mongoose.Schema({
  askerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  answered: {
    type: Boolean,
    default: false,
  },
  answerId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  },
});

const Question = module.exports = mongoose.model("Question", questionSchema);

module.exports.addQuestion = async function (newQuestion) {
  try {
    let question = await newQuestion.save();
    let response = {
      status: true,
      values: question
    }
    return response;
  } catch (error) {
    throw error;
  }
}
module.exports.getQuestions = async function (answered) {
  try {
    const query = { 'answered': answered }

    let questions = await this.find(query)
      .populate({ path: 'answerId', select: '-_id doctorId text date', populate: { path: 'doctorId', select: 'name' } })
      .populate('askerId');
    let response = {
      status: true,
      values: questions
    }
    return response;
  } catch (error) {
    throw error;
  }
}
module.exports.removeQuestion = async function (qid) {
  try {
    const query = { '_id': qid };
    let question = await this.findOne(query)
      .populate({ path: 'answerId', populate: { path: 'doctorId', select: 'questionsId' } })

    const indexD = question.answerId.doctorId.questionsId.indexOf(qid, 0);
    if (indexD > -1) {
      question.answerId.doctorId.questionsId.splice(indexD, 1);
    }
    question.answerId.doctorId.save();

    let answer = await question.answerId.remove();

    let results = await question.remove();
    let response = {
      status: true,
      values: results
    }
    return response;
  } catch (e) {
    throw e;
  }
}