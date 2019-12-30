import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { IUser, CommType, UserType, Appointment} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface IUserDoc extends IUser, Document { 
  // declare any instance methods here
  comparePass(username: String, password: String);
  hashPass(password: String);
  genToken(username: String);
}

export interface IUserModel extends Model<IUserDoc> {
  // declare any static methods here
  addUser(newUser: IUserDoc);
  authUser(username: String, password: String);
  deleteUser(id: String);
  updateUser(data: any);
  getUser(uid: String);
  getUsers();
  setToken(username: String);
  validateUser(username: String, token: String);
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
  },
  username:{
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  avatarSrc: {
    type: String,
  },
  validToken: {
    type: String,
  },
  validTime: {
    type: Number,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  type: { 
    type: String, 
  },
  doctorId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Doctor',
  },
  patientId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Patient',
  },
  createdAt: { type: Date, default: Date.now },
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
userSchema.methods = {
  comparePass: async function (candidatePassword: String, password: String) {
    try {
      return await bcrypt.compare(candidatePassword, password);
    } catch (error) {
      throw error;
     }
  },
  hashPass: async function (password: String) {
    try {
      let salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    } catch (error) {
      throw error;
     }
  },
  genToken: function (username: String){
    try {
      const hash = crypto.createHash('sha1');

      var hrTime = process.hrtime();
      var validTime = hrTime[0] * 1000000 + hrTime[1] / 1000

      var toHash = username + validTime.toString() + environment.vSecret;
      hash.update(toHash);
      return [hash.digest('hex'), validTime]
    } catch (error) {
      throw error;
     }    
  }
};

userSchema.statics = {
  addUser: async function (newUser: IUserDoc) {
    try {
      let user= await this.findOne({"mail": newUser.mail});
      if(user){
        throw new Error('Email already in use');
      } else{
        user = await this.findOne({"username": newUser.username});
        if(user){
          throw new Error('Username already in use');
        } else{
          newUser.password = await newUser.hashPass(newUser.password);
          user = await newUser.save();
          let response = {
            status: true,
            values: user
          }
          return response
        }
      }
    } catch (error) {
      throw error;
    }
  },
  authUser: async function (username: String, password: String) {
    try {
      let user = await this.findOne({"username": username})
        .populate('doctorId')
        .populate('patientId');
      if(!user){
        throw new Error("Username doesn't exist")
      }
      let isMatch = await user.comparePass(password, user.password)
      if(isMatch){
        const token = jwt.sign(user.toJSON(), environment.authSecret, {
					expiresIn: 604800 //1 week
				});        
				let auth = {
					token: token,
					user: user,
				}
        return auth;
      }
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async function (id: String){
    try{
      const query = {"_id": id};
      return await this.findOneAndRemove(query); 
    }catch (error) {
      throw error;
    }
  },
  updateUser: async function (data: any){
    try{
      const query = {'_id': data.id}
      let user = await this.findOne(query);
      user.name = data.name;
      user.avatarSrc = data.avatarSrc;
      user.phone = data.phone;
     user = await user.save();
     let response = {
      status: true,
      values: user
    }
    return response
     
    }catch (error) {
      throw error;
    }
  },  
  getUser: async function (uid: String){ //Need tons of work
    try{
      const query = {'_id': uid}
      let user = await this.findOne(query);
      let response = {
        status: true,
        values: user
      }
      return response
    }catch (error) {
      throw error;
    }
  },
  getUsers: async function (){ //Need tons of work
    try{
      const query = {};
      let users = await this.find(query);
      let response = {
        status: true,
        values: users
      }
      return response
    }catch (error) {
      throw error;
    }
  },
  setToken: async function (username: String){
    try{
      let tokenData = this.genToken(username);
      const query = { username: username };
      let user = await this.findOneAndUpdate(
        query, {
        $set: {
          "validEmail": false,
          "validToken": tokenData[0],
          "validTime":  tokenData[1]
        }},
        updateOptions
      );
      return user;
    }catch (error) {
      throw error;
    }
  },
  validateUser: async function(username: String, token: String){
    try{
      const hrTime = process.hrtime();
      const thisTime = hrTime[0] * 1000000 + hrTime[1] / 1000
      const maxTime = 3600*8*1000000; 
      const query = {"username": username};

      let user= await this.findOne(query);

      if(thisTime - user.validTime < maxTime) {
        if(user.validToken == token){
          user = await this.findOneAndUpdate(
            query, {
            $set: {
              "validEmail": true,
            }},
            updateOptions
          );
          return user;
        } else{
          throw new Error('Wrong token');
        }			
      } else {
        throw new Error('Token has expired');
      } 
    
    } catch(error){
      throw error;
    }
  },
};

export const User: IUserModel = model<IUserDoc, IUserModel>("User", userSchema);
export default User;
