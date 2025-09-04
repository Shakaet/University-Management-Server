import { model, Schema } from 'mongoose'
import { TacademicFaculty } from './academicFaculty.interface'
import { AppError } from '../../Errors/AppError'

const academicFacultySchema = new Schema<TacademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)



academicFacultySchema.pre("save",async function(next){

     let isExist=await academicFacultyModel.findOne({name:this.name})

    if(isExist){
         throw new AppError(404,"Department Already Exists....n","")
    }
    next()



})


academicFacultySchema.pre("updateOne",async function(next){

    // console.log(this.getQuery()._id)
     let payloadId=this.getQuery()._id
    // let query=this.getQuery()
    
     let isExist=await academicFacultyModel.findOne({_id:payloadId})

    if(!isExist){
         throw new AppError(404,"this Department not Exists....nn","")
    }
    next()

})

export const academicFacultyModel = model<TacademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
)
