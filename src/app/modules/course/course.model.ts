import { Schema, model, Types } from "mongoose";
import { TCourses, TPreRequisite } from "./course.interface";



// ----------------- Schema -----------------
const preRequisiteSchema = new Schema<TPreRequisite>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course", // অন্য Course কে reference করছে
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false } // আলাদা _id চাইলে true দিন, এখানে দরকার নেই
);

const courseSchema = new Schema<TCourses>(
  {
    title: { type: String,trim:true, required: true,unique:true },
    prefix: { type: String, required: true,trim:true },
    code: { type: Number, required: true,trim:true },
    credit: { type: Number, required: true,trim:true }, 
    preRequisite: {
      type: [preRequisiteSchema],
      default: [], // ✅ খালি array হলে default [] থাকবে
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // createdAt, updatedAt auto add হবে
  }
);

// ----------------- Model -----------------
export const CourseModel = model<TCourses>("Course", courseSchema);
