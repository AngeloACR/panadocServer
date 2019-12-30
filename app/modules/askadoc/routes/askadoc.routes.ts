import * as express from 'express';
import { Question } from '../models/question.schema.model';
import { Answer } from '../models/answer.schema.model';
import { Patient } from '../../mguide/models/patient.schema.model';
import { sendOk, sendError, fixUid } from '../../help';
import { auth } from '../../auth';
import { mockQuestion, mockAnswer } from '@panadoc/data';
import * as async from 'async'

const router = express.Router();
const addr = "/askadoc";

router.post('/', /*auth,*/ async (req, res) => {
  try {
    const question = {
      askerId: req.body.askerId,
      title: req.body.title,
      details: req.body.details,
    }
    let newQuestion = new Question(question)
    const msg = ` ${req.originalUrl} ${newQuestion.askerId} preguntó ${newQuestion.title}`;
    newQuestion = await Question.addQuestion(newQuestion);
    if(question.askerId){
      let added = await Patient.addQuestion(question.askerId, newQuestion._id);
    }
    sendOk(msg, res, fixUid(newQuestion));
  }
  catch (e) { sendError(addr, res, e) }
});

router.put('/:questionId', auth, async (req, res) => {
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
    let newAnswer = new Answer(answer)
    const msg = ` ${req.originalUrl} ${JSON.stringify(newAnswer)}`;
    let answeredQuestion = await Answer.addAnswer(newAnswer); //FIXME: Weird Errors
//    let question = await Answer.fillDoctor(questionId, newAnswer._id)
  //  let added = await Doctor.fillQuestion(doctorId, question._id);
    sendOk(msg, res, fixUid(answeredQuestion))
  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/unanswered', /*auth,*/ async (req, res) => {
  try {
    let questions = await Question.getQuestions(false)
    if (questions && questions.length) {
      const msg = ` ${req.originalUrl} `;
      sendOk(msg, res, questions.map(fixUid))
    } else {
      sendOk('There are not unanswered questions', res, [])
    }
  } catch (e) { sendError(addr, res, e) }
});

router.get('/answered', /*auth,*/ async (req, res) => {
  try {
    let questions = await Question.getQuestions(true)
    if (questions && questions.length) {
      const msg = ` ${req.originalUrl} `;
      sendOk(msg, res, questions.map(fixUid)) //FIXME: Values in Db, always return empty
    } else {
      sendOk('There are not answered questions', res, [])

    }
  } catch (e) { sendError(addr, res, e) }
});

router.get('/answered/:doctorId', /*auth,*/ async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    let answers = await Answer.getAnswersByDoctor(doctorId)
    if (answers && answers.length) {
      const msg = ` ${req.originalUrl} `;
      sendOk(msg, res, answers.map(fixUid))
    } else {
      sendOk('There are not answered questions by this doctor', res, [])
    }
  } catch (e) { sendError(addr, res, e) }
});//UNTESTED:

router.delete('/answer/:answerId', /*auth,*/ async (req, res) => {
  try {
    const answerId = req.params.answerId;
    let answer = await Answer.removeAnswer(answerId);
      const msg = ` ${req.originalUrl} `;
      sendOk(msg, res, fixUid(answer))
  } catch (e) { sendError(addr, res, e) }
});//UNTESTED:

router.delete('/question/:questionId', /*auth,*/ async (req, res) => {
  try {
    const questionId = req.params.questionId;
    let question = await Question.removeQuestion(questionId)
    const msg = ` ${req.originalUrl} `;
    sendOk(msg, res, fixUid(question) )
  } catch (e) { sendError(addr, res, e) }
});//UNTESTED:

export {
  addr as ASKADOC_ENDPOINT,
  router as AskADocRoutes
};