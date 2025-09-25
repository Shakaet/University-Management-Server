import { Schema, model, Types } from "mongoose";
import { TFaculty, TUserName, TGender, TBloodGroup } from "./faculty.interface"; // adjust path

// Subschema for UserName
const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  }
);

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    designation: { type: String, required: true },
    name: { type: userNameSchema, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloogGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicDepartment",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Faculty = model<TFaculty>("Faculty", facultySchema);
