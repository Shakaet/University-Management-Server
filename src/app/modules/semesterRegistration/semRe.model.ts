import { model, Schema } from "mongoose";
import { TsemesterRegistration } from "./SemRe.interface";





const semesterRegistrationSchema=new Schema<TsemesterRegistration>(

    {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester", 
      required: true,
      unique:true 
    },
    status: {
      type: String,
      enum: ["UPCOMING", "ONGOING", "ENDS"],
      default: "UPCOMING",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default:3,
    },
    maxCredit: {
      type: Number,
      default:15,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }

)



// Create model
export const SemesterRegistrationModel = model<TsemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);