import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface SpecialityDoc extends Document { 
  sId: string;
  name: string;
  // declare any instance methods here

}

export interface SpecialityModel extends Model<SpecialityDoc> {
  // declare any static methods here
  addSpeciality(newSpeciality: SpecialityDoc); // this should be changed to the correct return type if possible.
}

const specialitySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
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
specialitySchema.methods = {
};

specialitySchema.statics = {
  addSpeciality: (speciality: string): string => {
    return speciality;
  };
};
export const Speciality: SpecialityModel = model<SpecialityDoc, SpecialityModel>("Speciality", specialitySchema);
export default Speciality;