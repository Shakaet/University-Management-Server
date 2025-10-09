import { Types } from "mongoose"



export type TsemesterRegistration={
    academicSemester:Types.ObjectId,
    status:"UPCOMING"|"ONGOING"|"ENDS",
    startDate:Date,
    endDate:Date,
    minCredit:number,
    maxCredit:number
}