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

export let updateCoursesIntoDb=async(id:string,payload:Partial<TCourses>)=>{  
    
    
    let {preRequisite,...remainiBasicData}=payload

    console.log(preRequisite)

    let updateBasicData=await CourseModel.findByIdAndUpdate(
        id,
        remainiBasicData,
        {new:true}
    )

   // preRequisite er moddhe isdeleted true thakle seta remove korte hobe,false thakle add korte hobe,


    // check if any preRequisite is there to update
    if(preRequisite && preRequisite.length>0){


        //filter out the deleted fields

        let deletedPreRequisite=preRequisite.filter((item)=>item.course && item.isDeleted).map((item)=>item.course)

         console.log(deletedPreRequisite);



         let deletePreRequisiteCourses=await CourseModel.findByIdAndUpdate(
            id,
            {
                $pull:{
                    preRequisite:{
                        course:{ $in: deletedPreRequisite }
                    }
                }
            },
            {new:true}
         )

        //  return deletePreRequisiteCourses
    }

    return updateBasicData
   

    

    





}