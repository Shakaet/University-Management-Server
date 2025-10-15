import { TDays } from "./offerCourse.interface"




export type Tschedule={
    days:TDays[]
    startTime:string,
    endTime:string

}

export let hasTimeConflict=(assignSchedule:Tschedule[],newSchedule:Tschedule)=>{




  for (let schedule of assignSchedule) {
    let existingStartTime = new Date(`1970-01-01T${schedule.startTime}`)
    let existingEndTime = new Date(`1970-01-01T${schedule.endTime}`)
    let newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
    let newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`)

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true // এখানেই পুরো ফাংশন থেকে বেরিয়ে যাবে
    }
  }

  return false
    
    









}