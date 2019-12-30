import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Review as RV} from "@panadoc/data";
import { environment } from '../../../../environments/environment';
import { customId } from '../../help';

export interface ReviewDoc extends RV, Document { 
  // declare any instance methods here

}

export interface ReviewModel extends Model<ReviewDoc> {
  // declare any static methods here
  addReview(newReview: ReviewDoc); // this should be changed to the correct return type if possible.
}

const reviewSchema: Schema = new Schema({
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
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,  
  },
  rating: {
    type: Number,
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
reviewSchema.methods = {
};

reviewSchema.statics = {
  addReview: async function (review: ReviewDoc) {
    try {
      console.log("TCL: review", review)
    } catch (error) { }
  }
};


export const Review: ReviewModel = model<ReviewDoc, ReviewModel>("Review", reviewSchema);
export default Review;