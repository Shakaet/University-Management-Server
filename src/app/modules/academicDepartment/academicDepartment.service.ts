import { TacademicDepartment } from "./academicDepartment.interface"
import { academicDepartmentModel } from "./academicDepartment.model"


export let createAcademicDepartmentToDb = async (payload: TacademicDepartment) => {



    // let isExist=await academicDepartmentModel.findOne({name:payload.name})

    // if(isExist){
    //      throw new Error("Department Already Existed")
    // }
  let result = await academicDepartmentModel.create(payload)

  return result
}

export let findAllAcademicDepartment = async () => {
  let result = await academicDepartmentModel.find()

  return result
}

export let findOneAcademicDepartment = async (id: string) => {
  let result = await academicDepartmentModel.findOne({ _id: id })

  return result
}

export let updateAcademicDepartment = async (
  id: string,
  data: TacademicDepartment,
) => {
  let result = await academicDepartmentModel.updateOne(
    { _id: id },
    {
      $set: {
        name: data.name,
      },
    },
  )

  return result
}
