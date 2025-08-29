import { Schema, model } from "mongoose";
import { TacademicSemester } from "./academicSem.interface";

const academicSemesterSchema = new Schema<TacademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: ["Autumn", "Summmar", "Fall"],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ["01", "02", "03"],
    },
    startMonth: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    endMonth: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemesterModel = model("AcademicSemester", academicSemesterSchema);
