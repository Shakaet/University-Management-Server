import { model, Schema } from 'mongoose'
import { TacademicDepartment } from './academicDepartment.interface'
import { AppError } from '../../Errors/AppError'


const academicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty:{type:Schema.Types.ObjectId,required:true,ref:"academicFaculty"}
  },
  { timestamps: true },
)









academicDepartmentSchema.pre("save",async function(next){

     let isExist=await academicDepartmentModel.findOne({name:this.name})

    if(isExist){
        //  throw new Error("Department Already Exists....")
        throw new AppError(404, "Department Already Exists....", "");
    }
    next()



})


academicDepartmentSchema.pre("updateOne",async function(next){

    // console.log(this.getQuery()._id)
     let payloadId=this.getQuery()._id
    // let query=this.getQuery()
    
     let isExist=await academicDepartmentModel.findOne({_id:payloadId})

    if(!isExist){
        //  throw new Error("this Department Already Exists....")
        throw new AppError(404, "this Department Already Exists....", "");
    }
    next()

})

export const academicDepartmentModel = model<TacademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema
  ,
)
