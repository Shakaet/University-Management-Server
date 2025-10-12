import { catchAsynFunction } from "../../utils/catchAsync";
import { createOfferedCoursesIntoDb, getAllFacultiesFromDB } from "./offerCourse.service";





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

