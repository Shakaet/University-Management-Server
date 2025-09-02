import { Types } from "mongoose"

export type TacademicDepartment = {
  name: String,
  academicFaculty:Types.ObjectId
}
