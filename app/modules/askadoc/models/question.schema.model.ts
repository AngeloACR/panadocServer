import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Question as Q} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface QuestionDoc extends Q, Document {

}

export interface QuestionModel extends Model<QuestionDoc> {
  // declare any static methods here
  addQuestion(newQuestion: QuestionDoc); // this should be changed to the correct return type if possible.
  getQuestions(answered: boolean);
  removeQuestion(qid: String);
}

const questionSchema: Schema = new Schema({
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
  answered:{
    type: Boolean,
    default: false,
  },
  answerId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  },
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

questionSchema.methods = {
};

questionSchema.statics = {
  addQuestion: async function (newQuestion: QuestionDoc) {
    try {
      return await newQuestion.save();
    } catch (error) { 
      throw error;
    }
  },
  getQuestions: async function (answered: boolean) {
    try {
      const query = {'answered': answered}
      console
      return await this.find(query)
      .populate({path: 'answerId',select: '-_id doctorId text date', populate: {path: 'doctorId', select: 'name'}})
      .populate('askerId');
    } catch (error) {
      throw error;
     }
  }, 
  removeQuestion: async function(qid: String){
    try{
      const query = {'_id': qid};
      let question = await this.findOne(query)
        .populate({path: 'answerId', populate: {path: 'doctorId',select: 'questionsId'}})
      
      const indexD = question.answerId.doctorId.questionsId.indexOf(qid, 0);
      if (indexD > -1) {
        question.answerId.doctorId.questionsId.splice(indexD, 1);
      }
      question.answerId.doctorId.save();
      
      let answer = await question.answerId.remove();
      
      return await question.remove();;
    } catch(e){
      throw e;
    }
  },

};
export const Question: QuestionModel = model<QuestionDoc, QuestionModel>("Question", questionSchema);
export default Question;