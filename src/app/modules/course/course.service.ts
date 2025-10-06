import { Query } from 'mongoose';
import { TCourses } from "./course.interface"
import { CourseModel } from "./course.model"
import QueryBuilder from '../../builder/QueryBuilder';



export let creeateCoursesIntoDb=async(payload:TCourses)=>{


    let result= await CourseModel.create(payload)

    return result

}

export let getAllCoursesFromDb=async(query:Record<string,unknown>)=>{


    const queryBuilder = new QueryBuilder(CourseModel.find(), query)
        .search(["title", "prefix", "code"])
        .filter()
        .sort()
        .paginate()
        .fields();
    
      const result = await queryBuilder.modelQuery.populate('preRequisite.course'); 
      return result;


    

}

export let getSingleCoursesFromDb=async(id:string)=>{


    let result= await CourseModel.findById(id).populate('preRequisite.course')

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