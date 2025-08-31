import {
  iSemesterNameEqualSemesterCode,
  TacademicSemester,
} from './academicSem.interface'
import { AcademicSemesterModel } from './academicSem.model'

export let createAcademicSemToDb = async (payload: TacademicSemester) => {
  //  Autumn  er jonno code 01, Summar er jonno  02 ,Fall er jonno code 03 keo na dile Error validation

  if (iSemesterNameEqualSemesterCode[payload.name] !== payload.code) {
    throw new Error(
      `${payload.name} is not valid Semester Name for code ${payload.code} `,
    )
  }

  let result = await AcademicSemesterModel.create(payload)

  return result
}

export let findAllAcademicSemester = async () => {
  let result = await AcademicSemesterModel.find()

  return result
}

export let findOneAcademicSemester = async (id: string) => {
  let result = await AcademicSemesterModel.findOne({ _id: id })

  return result
}

export let updateAcademicSem = async (id: string, data: TacademicSemester) => {
  // console.log(id,data)

  if (iSemesterNameEqualSemesterCode[data.name] !== data.code) {
    throw new Error(
      `${data.name} is not valid Semester Name for code ${data.code} ....`,
    )
  }

  let result = await AcademicSemesterModel.updateOne(
    { _id: id },
    {
      $set: {
        name: data.name,
        year: data.year,
        code: data.code,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      },
    },
  )

  return result
}
