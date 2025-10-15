import { catchAsynFunction } from "../../utils/catchAsync";
import { senResponse } from "../../utils/sendResponse";
import { createOfferedCoursesIntoDb, deleteOfferCourseFromDB, getAllFacultiesFromDB, getSingleFacultiesFromDB, updateOfferCourseIntoDB } from "./offerCourse.service";





export let createOfferedCoursesController=catchAsynFunction( async (req, res) => {
    let payload = req.body
    // console.log(payload)

    let result = await createOfferedCoursesIntoDb(payload)

    // send response

    res.status(201).json({
      status: true,
      message:
        (result as any)?.message || ' Offered Courses created successfully',
      data: result,
    })

    // senResponse(res,200,{
    //     status:true,
    //     message:(result as any)?.message || "student created successfullyN",
    //      data:result
    // })
  },)


export const getAllOfferCourses = catchAsynFunction(async (req, res) => {
  const result = await getAllFacultiesFromDB(req.query);

  res.status(200).json({
      status: true,
      messsage: 'Offered Courses retrive Successfully',
      data: result,
    })
});


export let findOneOfferCoursesController=catchAsynFunction(async (req, res) => {

  let {id}=req.params
  const result = await getSingleFacultiesFromDB(id);

  res.status(200).json({
      status: true,
      messsage: 'Single Offered Courses retrive Successfully',
      data: result,
    })
});




export let updateOfferCourse=catchAsynFunction(async(req,res)=>{


  let {id}=req.params

  let data=req.body

  let result=await updateOfferCourseIntoDB(id,data)



  senResponse(res,200,{

     status: true,
    message: 'Offer Course Update Successfully',
    data: result,
    
  })



})




export let deletedOfferCourse=catchAsynFunction(async(req,res)=>{

   const { id } = req.params;
    const result = await deleteOfferCourseFromDB(id);
    senResponse(res,200,{

     status: true,
    message: 'Offered Course deleted successfully',
    data: result,
    
  })
})

