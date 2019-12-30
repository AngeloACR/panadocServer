import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface RoleDoc extends Document {
  rId: string;
  name: string;
  capabilities: string;
  // declare any instance methods here

}

export interface RoleModel extends Model<RoleDoc> {
  // declare any static methods here
  addRole(newRole: RoleDoc); // this should be changed to the correct return type if possible.
}

const roleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capabilities: [{
    type: String,
    required: true,
  }],
  usersId: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
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
roleSchema.methods = {
};

roleSchema.statics = {
  addRole: async function (role: RoleDoc) {
    try {
      console.log("TCL: role", role)
    } catch (error) { }
  }
};
export const Role: RoleModel = model<RoleDoc, RoleModel>("Role", roleSchema);
export default Role;