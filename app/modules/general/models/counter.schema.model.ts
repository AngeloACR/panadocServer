import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { environment } from '../../../../environments/environment';

export interface CounterDoc extends Document {

}

export interface CounterModel extends Model<CounterDoc> {
  // declare any static methods here
  existCounter(id: String);
  addCollection(id: String);
  incValue(id: String);
  decValue(id: String);
}

const counterSchema: Schema = new Schema({
  id: {
    type: String,
  },
  value: {
      type: Number,
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
counterSchema.methods = {
};

counterSchema.statics = {
  existCounter: async function(id: String){
    try{
      let query = {'id': id};
      const count = await this.findOne(query);
      return count;
    } catch(e){}
  },
  addCollection: async function(id: String){
    try {
        let count = new Counter({
            'id': id,
            'value': 1,
        });
        return await count.save();
    } catch (error) { }
  },
  incValue: async function (id: String) {
    try {
        const query = {'id': id};
        let count = await this.findOneAndUpdate(
            query,{
            $inc: {
                "value": 1
            }},
            updateOptions
        );
        return count.value; 
    } catch (error) { }
  },
  decValue: async function (id: String) {
    try {
    } catch (error) { }
  }
};

export const Counter: CounterModel = model<CounterDoc, CounterModel>("Counter", counterSchema);
export default Counter;