import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface SymptomDoc extends Document { 
  sId: string;
  name: string;
  // declare any instance methods here

}

export interface SymptomModel extends Model<SymptomDoc> {
  // declare any static methods here
  addSymptom(newSymptom: SymptomDoc); // this should be changed to the correct return type if possible.
}
const symptomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  }
}).pre('save', async function(next) {
  let sId = await customId('symptom');
  this._id = sId;
  next();
});

const getSymptoms = function (callback) {
  const query = {};
  Symptom.find(query, callback);
};

const addSymptom = function (newSymptom, callback) {
      newSymptom.save(callback);
};

const updateSymptom = function (details, callback) {
  const query = { sId: details.sId };
  Symptom.findOneAndUpdate(query, {
    $set: {
      "name": details.name,
    }
  },
    callback);
};

const deleteSymptom = function (sId, callback) {
  const query = { sId: sId }
  Symptom.findOneAndRemove(query, callback);
};

/**
 * Methods
 */
const updateOptions = {
  multi: true,
  safe: true,
  runValidators: true,
  upsert: true
};
symptomSchema.methods = {
};

symptomSchema.statics = {
  addSymptom: async function (symptom: string) {
    try {
      console.log("TCL: symptom", symptom)
    } catch (error) { }
  }
};
export const Symptom: SymptomModel = model<SymptomDoc, SymptomModel>("Symptom", symptomSchema);
export default Symptom