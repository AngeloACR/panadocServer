import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
//import { MH} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface MHDoc extends Document {

}

export interface MHModel extends Model<MHDoc> {

}

const mhSchema: Schema = new Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
  info: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
//    ref: 'Symptoms',
  }
/*  chatsId: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Chat'
  }],*/
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
mhSchema.methods = {
};

mhSchema.statics = {
  addMH: async function (mh: MHDoc) {
    try {
    } catch (error) { }
  }
};

export const MH: MHModel = model<MHDoc, MHModel>("MH", mhSchema);
export default MH;
