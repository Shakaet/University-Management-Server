import { model, Schema } from 'mongoose'
import { TacademicDepartment } from './academicDepartment.interface'


const academicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty:{type:Schema.Types.ObjectId,required:true}
  },
  { timestamps: true },
)

export const academicDepartmentModel = model<TacademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema
  ,
)
