import mongoose, { Query } from 'mongoose';
import { TCourses, TFaculties } from "./course.interface"
import { courseFacultyModel, CourseModel } from "./course.model"
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
    
     const session = await mongoose.startSession()

  try{

    session.startTransaction()


      
    let {preRequisite,...remainiBasicData}=payload

    // console.log(preRequisite)

    let updateBasicData=await CourseModel.findByIdAndUpdate(
        id,
        remainiBasicData,
        {new:true,session}
    )

    if(!updateBasicData){
        throw new Error('Failed to update course');
    }

   // preRequisite er moddhe isdeleted true thakle seta remove korte hobe,false thakle add korte hobe,

       // 2️⃣ Declare variables to return later
            let deletePreRequisiteCourses
            let addNewPreRequisiteCourses
    // check if any preRequisite is there to update
    if(preRequisite && preRequisite.length>0){


        //filter out the deleted fields

        let deletedPreRequisite=preRequisite.filter((item)=>item.course && item.isDeleted).map((item)=>item.course)

        //  console.log(deletedPreRequisite);



          deletePreRequisiteCourses=await CourseModel.findByIdAndUpdate(
            id,
            {
                $pull:{
                    preRequisite:{
                        course:{ $in: deletedPreRequisite }
                    }
                }
            },
            {new:true,session}
         )


         if(!deletePreRequisiteCourses){
            throw new Error('Failed to update course');
        }

         // filterout the new preRequisite to add


    let newPreRequisite=preRequisite?.filter((item)=>item.course && !item.isDeleted)
    // console.log(newPreRequisite); 

     addNewPreRequisiteCourses=await CourseModel.findByIdAndUpdate(
        id,
        {   $addToSet:{
                preRequisite:{ $each: newPreRequisite }
            }
        },
        {new:true,session}
     )


     if(!addNewPreRequisiteCourses){
        throw new Error('Failed to update course');
    }

        //   return {deletePreRequisiteCourses}
    }

     await session.commitTransaction()
    await session.endSession()


    
        

     return {deletePreRequisiteCourses,updateBasicData,addNewPreRequisiteCourses}

  }catch(error){
    
     await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to update course');

  }
   


}




export let assignFacultyWithCourseIntoDB=async(id:string,payload:Partial<TFaculties>)=>{



    let result =await courseFacultyModel.findByIdAndUpdate(
        id,
        {
            course:id,
            $addToSet:{faculties:{$each:payload}}
        },
        {
            upsert:true,
            new:true
        },
        
    )

    return result

    

 



}




export let removedFacultyWithCourseFromDB=async(id:string,payload:Partial<TFaculties>)=>{



    let result =await courseFacultyModel.findByIdAndUpdate(
        id,
        {
            $pull:{faculties:{$in:payload}}
        },
        {
           
            new:true
        },
        
    )

    return result

    

 



}