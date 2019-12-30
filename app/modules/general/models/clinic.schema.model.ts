import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
//import { Clinic} from "@panadoc/data";
import { environment } from '../../../../environments/environment';

export interface ClinicDoc extends Document { 

}
export interface ClinicModel extends Model<ClinicDoc> { 

}

const clinicSchema: Schema = new Schema({
  name: {
    type: String,
  },
  // users: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  users: {
    type: String,
  },
  // doctors: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Doctor',
  //   },
  // ],
  doctors: {
    type: String,
  },
  // patients: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Patient',
  //   },
  // ],
  patients: {
    type: String,
  },
  // roles: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Role',
  //   },
  // ],
  roles: {
    type: String,
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
clinicSchema.methods = {
};

clinicSchema.statics = {
};
export const Clinic: ClinicModel = model<ClinicDoc, ClinicModel>("Clinic", clinicSchema);
export default Clinic;