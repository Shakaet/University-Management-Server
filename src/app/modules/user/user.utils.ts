import { TacademicSemester } from '../academicSem/academicSem.interface'
import { UserModel } from './user.model'

let findStudentLastId = async () => {
  let findlastStudentIdx = await UserModel.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean()

  // if(findlastStudentIdx){
  //     return findlastStudentIdx?.id?.substring(6)
  // }
  if (findlastStudentIdx) {
    return findlastStudentIdx?.id
  } else {
    return undefined
  }
}

//  id format hobe year+code+00+01+02
export let generatedStudentId = async (payload: TacademicSemester | null) => {
  let LastFullId = await findStudentLastId()
  //  console.log(await findStudentLastId())

  let LastIdx: string = '0000'
  let LastYear = LastFullId?.substring(0, 4)
  let LastSemCode = LastFullId?.substring(4, 6)
  // let LastId=LastFullId?.substring(6)
  let currentYear = payload?.year
  let currentSemCode = payload?.code

  if (
    LastFullId &&
    currentYear === LastYear &&
    currentSemCode === LastSemCode
  ) {
    LastIdx = LastFullId?.substring(6)
  }

  //  let currentId=await findStudentLastId()|| (0).toString()

  //  let increment=(Number(currentId)+1).toString().padStart(4,"0")
  let increment = (Number(LastIdx) + 1).toString().padStart(4, '0')

  let increamentId = `${payload?.year}${payload?.code}${increment}`

  return increamentId
}
