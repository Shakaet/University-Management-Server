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


 //  Autumn  er jonno code 01, Summar er jonno  02 ,Fall er jonno code 03 keo na dile Error validation
      

   export  type iSemesterNameEqualSemesterCodeType={
        // Autumn:"01",
        // Summmar:"02",
        //  Fall:"03"
        [ key:string]:string

    }

   export let iSemesterNameEqualSemesterCode:iSemesterNameEqualSemesterCodeType={

        Autumn:"01",
        Summmar:"02",
        Fall:"03"
    }
