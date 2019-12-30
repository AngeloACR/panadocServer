const mongoose = require('mongoose');
const config = require('../../config/database');
const Schema = require('mongoose').Schema;

const answerSchema = mongoose.Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor',
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Question',
  }
});

const Answer = module.exports = mongoose.model("Answer", answerSchema);

module.exports.addAnswer = async function (newAnswer) {
  try {
    const query = { 'questionId': newAnswer.questionId }
    let answer = await this.findOne(query);
    if (!answer) {
      answer = await newAnswer.save();
      answer = await this.fillChilds(answer._id);
      //        let question = await this.fillQuestion(answer._id);
      let response = {
				status: true,
				values: answer
			}
			return response
    } else {
      throw new Error("Question already answered");
    }
  } catch (error) {
    throw error;
  }
}
module.exports.fillChilds = async function (id) {
  const query = { '_id': id }
  let answer = await this.findOne(query)
    .populate('doctorId')
    .populate('questionId');
  answer.doctorId.questionsId.push(answer.questionId._id);
  answer.questionId['answerId'] = id;
  let doctor = await answer.doctorId.save();
  let question = await answer.questionId.save();
  return answer;
}
module.exports.removeAnswer = async function (aid) {
  try {
    const query = { '_id': aid };
    let answer = await this.findOne(query)
      .populate({ path: 'questionId', select: '_id answerId' })
      .populate({ path: 'doctorId', select: 'questionsId' });

    answer.questionId.answerId = null;
    answer.questionId.save();

    let qid = answer.questionId._id;
    const indexD = answer.doctorId.questionsId.indexOf(qid, 0);
    if (indexD > -1) {
      answer.doctorId.questionsId.splice(indexD, 1);
    }
    answer.doctorId.save();
    
    let result = await answer.remove();;
      let response = {
        status: true,
        values: result
      }
      return response
  } catch (e) {
    throw e;
  }
}
module.exports.getAnswersByDoctor = async function (did) {
  try {
    const query = { doctorId: did }
    let answers = await this.find(query)
      .populate('questionId')
      .populate('doctorId');
    if (answers && answers.length) {
      let response = {
				status: true,
				values: answers
			}
			return response
		} else {
			throw new Error('There is no answers of this doctor');
		}
  } catch (error) {
    throw error;
  }
}