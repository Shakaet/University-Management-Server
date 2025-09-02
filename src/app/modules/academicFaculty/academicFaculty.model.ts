import { model, Schema } from 'mongoose'
import { TacademicFaculty } from './academicFaculty.interface'

const academicFacultySchema = new Schema<TacademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

export const academicFacultyModel = model<TacademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
)
