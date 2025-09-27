import { TCourses } from "./course.interface"
import { CourseModel } from "./course.model"



export let creeateCoursesIntoDb=async(payload:TCourses)=>{


    let result= await CourseModel.create(payload)

    return result

}

export let getAllCoursesFromDb=async()=>{


    let result= await CourseModel.find()

    return result

}

export let getSingleCoursesFromDb=async(id:string)=>{


    let result= await CourseModel.findById(id)

    return result

}


export let deletecoursesFromDb=async(id:string)=>{


    let result= await CourseModel.findByIdAndUpdate(
        id,
        {isDeleted:true},
        {new:true}
    )

    return result

}