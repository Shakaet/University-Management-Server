import { Types } from "mongoose"

type Tmonth="January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

export type TacademicSemester={
     name:"Autumn"|"Summmar"|"Fall",
     year:string,
     code:"01"|"02"|"03",
     startMonth:Tmonth,
     endMonth:Tmonth





}