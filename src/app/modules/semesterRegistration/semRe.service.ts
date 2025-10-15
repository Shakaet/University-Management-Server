import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../Errors/AppError';
import { TacademicSemester } from '../academicSem/academicSem.interface';
import { AcademicSemesterModel } from '../academicSem/academicSem.model';
import { TsemesterRegistration } from './SemRe.interface';
import { SemesterRegistrationModel } from './semRe.model';
import { OfferedCourseModel } from '../offerCourses/offerCourse.model';




export let createSemesterRegistrationServices=async(payload:TsemesterRegistration)=>{

    let academicSemester= payload?.academicSemester


    // check if there any öngoing and upcoming semester that is already registered?


    let isOngoingUpcomingSemAlreadyRegistered=await SemesterRegistrationModel.findOne({status:{$in:["ONGOING","UPCOMING"]}})


    // console.log(isOngoingUpcomingSemAlreadyRegistered)
    if(isOngoingUpcomingSemAlreadyRegistered){

        throw new AppError(404,`there is already a ${isOngoingUpcomingSemAlreadyRegistered.status} semester`,"")


    }




     // check if academicSemester exist

        let isAcademicSemesterExist=await AcademicSemesterModel.findById(academicSemester)
        if(!isAcademicSemesterExist){
            throw new AppError(404,"Academic Semester not Exist","")
        }

    // check if the academic semester is already registered

    let isAcademicSemRegistrationExist=await SemesterRegistrationModel.findOne({academicSemester})

    if(isAcademicSemRegistrationExist){
        throw new Error("This Academic Semester Already Registered")
    }



    let result=await SemesterRegistrationModel.create(payload)


    return result

   
    


    

}



export let getAllSemesterRegistrationservices=async(query:Record<string, unknown>)=>{


  const queryBuilder = new QueryBuilder(SemesterRegistrationModel.find(), query)
      .search(["status"])
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await queryBuilder.modelQuery.populate("academicSemester");
      return result;


    

}



export let singleSemesterRegistrationservices=async(id:string)=>{

    let result=await SemesterRegistrationModel.findById(id)


    return result


    

}


export let updateSemesterRegistrationToDBservices=async(id:string,payload:Partial<TsemesterRegistration>)=>{


     let requestedStatus= payload?.status
    // check if the requested ragistered Semester is Exits

    let isRequestedSemesterExist=await SemesterRegistrationModel.findById(id)

     if(!isRequestedSemesterExist){
            throw new AppError(404," this Academic Semester not Exist ! ","")
        }


        // if the registered semester is ended, we will not update anything

        let requestSemesterStatus= await SemesterRegistrationModel.findOne({_id:id,status:"ENDED"})
        let currentSemesterStatus= isRequestedSemesterExist?.status
        if (requestSemesterStatus) {
        throw new AppError(404,`this semester is already ${requestSemesterStatus.status}`,"")
        } 
        // UPCOMING ==> ONGOING ==> ENDED (ulta hote parbena),ota handle korbo
        if(currentSemesterStatus=="UPCOMING" && requestedStatus=="ENDED"){

            throw new AppError(404,
                `You can not Directly Changed status From ${currentSemesterStatus} to ${requestedStatus}`,
                "")

        }


         if(currentSemesterStatus=="ONGOING" && requestedStatus=="UPCOMING"){

            throw new AppError(404,
                `You can not Directly Changed status From ${currentSemesterStatus} to ${requestedStatus}`,
                "")

        }



        let result=await SemesterRegistrationModel.findByIdAndUpdate(
            id,
            payload,
            {
                new:true,
                runValidators:true,
            }

        )

        return result

        

    }




export let deletedSemesterRegistrationToDBservices=async(id:string)=>{

   

    
    // console.log(id)

    let semesterRegistrationExist=await SemesterRegistrationModel.findById(id)

    if(!semesterRegistrationExist){
        throw new AppError(404,"this Semester Reistration not Exist in DB","")
    }


    if(semesterRegistrationExist.status!=="UPCOMING"){

         throw new AppError(
              404,
              `Offered course can not update ! because the semester ${semesterRegistrationExist?.status}`,
              ""
            );
    }
     
   
  

     const session = await mongoose.startSession(); // 1️⃣ Start session

    try{

         session.startTransaction();

         



    let deletedOfferCourse=await OfferedCourseModel.deleteMany({semesterRegistration:id},{session})
     
    if(!deletedOfferCourse){
        throw new AppError(400,"Offer Course Does not Deleted","")
    }

    let deletedSemesterRegistration=await SemesterRegistrationModel.findByIdAndDelete(id,{new:true, session})

     if(!deletedSemesterRegistration){
        throw new AppError(400,"Semester Registration Does not Deleted","")
    }
     await session.commitTransaction()
    await session.endSession()

    return deletedSemesterRegistration

    }catch(err:any){

    await session.abortTransaction()
    await session.endSession()
    // throw new Error("failed to Delete Semester Registration")
    throw new Error(err)

    }



  

}

    

