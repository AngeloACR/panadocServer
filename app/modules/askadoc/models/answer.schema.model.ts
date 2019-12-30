import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Answer as AW} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface AnswerDoc extends AW, Document {

}

export interface AnswerModel extends Model<AnswerDoc> {
  // declare any static methods here
  addAnswer(newAnswer: AnswerDoc); // this should be changed to the correct return type if possible.
  removeAnswer(aid: String); // this should be changed to the correct return type if possible.
  getAnswersByDoctor(did: String); // this should be changed to the correct return type if possible.
}

const answerSchema: Schema = new Schema({
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

/**
 * Methods
 */
const updateOptions = {
  multi: true,
  safe: true,
  runValidators: true,
  upsert: true
};
answerSchema.methods = {
};

answerSchema.statics = {
  addAnswer: async function (newAnswer: AnswerDoc) {
    try {
      const query = {'questionId': newAnswer.questionId}
      let answer = await this.findOne(query);
      if(!answer){
        answer = await newAnswer.save();
        answer = await this.fillChilds(answer._id);
//        let question = await this.fillQuestion(answer._id);
        return answer;
      } else{
        throw new Error("Question already answered");
      }
    } catch (error) { 
      throw error;
    }
  },
  fillChilds: async function(id: Schema.Types.ObjectId){
      const query = {'_id': id}
      let answer = await this.findOne(query)
        .populate('doctorId')
        .populate('questionId');
      answer.doctorId.questionsId.push(answer.questionId._id);
      answer.questionId['answerId'] = id;
      let doctor = await answer.doctorId.save();
      let question = await answer.questionId.save();
      return answer;
  },
  removeAnswer: async function(aid: Schema.Types.ObjectId){
    try{
      const query = {'_id': aid};
      let answer = await this.findOne(query)
        .populate({path: 'questionId', select: '_id answerId'})
        .populate({path: 'doctorId', select: 'questionsId'});
      
      answer.questionId.answerId = null;
      answer.questionId.save();

      let qid = answer.questionId._id;
      const indexD = answer.doctorId.questionsId.indexOf(qid, 0);
      if (indexD > -1) {
        answer.doctorId.questionsId.splice(indexD, 1);
      }
      answer.doctorId.save();
      
      return await answer.remove();;
    } catch(e){
      throw e;
    }
  },
  getAnswersByDoctor: async function (did: String) {
    try {
      const query = {doctorId: did}
      console
      return await this.find(query)
      .populate('questionId')
      .populate('doctorId');
    } catch (error) {
      throw error;
     }
  }, 
};

export const Answer: AnswerModel = model<AnswerDoc, AnswerModel>("Answer", answerSchema);
export default Answer;