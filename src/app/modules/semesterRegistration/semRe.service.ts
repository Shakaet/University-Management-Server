import { AppError } from '../../Errors/AppError';
import { AcademicSemesterModel } from '../academicSem/academicSem.model';
import { TsemesterRegistration } from './SemRe.interface';
import { SemesterRegistrationModel } from './semRe.model';




export let createSemesterRegistrationServices=async(payload:TsemesterRegistration)=>{

    let academicSemester= payload?.academicSemester


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



export let getAllSemesterRegistrationservices=async()=>{


    

}



export let singleSemesterRegistrationservices=async()=>{


    

}


export let updateSemesterRegistrationToDBservices=async()=>{


    

}