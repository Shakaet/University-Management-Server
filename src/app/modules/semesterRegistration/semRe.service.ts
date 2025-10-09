import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../Errors/AppError';
import { AcademicSemesterModel } from '../academicSem/academicSem.model';
import { TsemesterRegistration } from './SemRe.interface';
import { SemesterRegistrationModel } from './semRe.model';




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


export let updateSemesterRegistrationToDBservices=async(id:string)=>{


    

}