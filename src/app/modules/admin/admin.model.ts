import { Schema, model, Types, Model } from "mongoose";
import { TAdmin, TUserName } from "./admin.interface"; // ধরো এখানে তোমার টাইপ ডিফাইন করা আছে

// Subschema for UserName
const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  { _id: false } // আলাদা _id দরকার নেই
);

// Main Admin Schema
const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // ধরো আলাদা User model আছে
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
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // createdAt, updatedAt auto তৈরি হবে
  }
);

// Create Model
const Admin: Model<TAdmin> = model<TAdmin>("Admin", adminSchema);

export default Admin;
