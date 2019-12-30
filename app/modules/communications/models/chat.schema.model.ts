import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { ChatUnit} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface ChatDoc extends ChatUnit, Document { 
  // declare any instance methods here
}

export interface ChatModel extends Model<ChatDoc> {
  // declare any static methods here
  addChat(newChat: ChatDoc); // this should be changed to the correct return type if possible.
  getChatsByPatient(patientId: string)
  getChatsByDoctor(doctorId: string)
  addLog(chatId: number, log: string);
}
const chatSchema: Schema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor',
  },
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  log: [{
    type: String,
  }],
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
chatSchema.methods = {
};

chatSchema.statics = {
  addChat: async function (newChat: ChatDoc) {
    try {
      return await newChat.save();
    } catch (error) { 
      throw error;
    }
  },
  addLog: async function (chatId: string, log: string) {
    try {
      const query = {'_id': chatId};
      let chat = await this.findOne(query);
      chat.log.push(log);
      return chat.save();
    } catch (error) { 
      throw error;
    }
  },  
  getChatsByDoctor: async function(doctorId: string){
    try{
      const query = {'doctorId': doctorId};
      return await this.find(query);
    }catch(e){
      throw e;
    }
  },
  getChatsByPatient: async function(patientId: string){
    try{
      const query = {'patientId': patientId};
      return await this.find(query);
    }catch(e){
      throw e;
    }
  },
};
export const Chat: ChatModel = model<ChatDoc, ChatModel>("Chat", chatSchema);
export default Chat;