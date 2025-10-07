import { NextFunction, Request, RequestHandler, Response } from 'express'
import { catchAsynFunction } from '../../utils/catchAsync'
import { assignFacultyInfoDB, assignFacultyWithCourseIntoDB, creeateCoursesIntoDb, deletecoursesFromDb, getAllCoursesFromDb, getSingleCoursesFromDb, removedFacultyWithCourseFromDB, updateCoursesIntoDb } from './course.service'



// RequestHandler dile autometic req,res,next er type declard hoye jabe
export const createCoursesController = catchAsynFunction(
  async (req, res) => {
    let payload = req.body

    let result = await creeateCoursesIntoDb(payload)

    // send response

    res.status(201).json({
      status: true,
      message:
        (result as any)?.message || 'Courses created successfully',
      data: result,
    })

    // senResponse(res,200,{
    //     status:true,
    //     message:(result as any)?.message || "student created successfullyN",
    //      data:result
    // })
  },
)

export let findAllCoursesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let result = await getAllCoursesFromDb(req.query)

  res.status(200).json({
    status: true,
    message:
      (result as any)?.message || 'Courses retrieved successfully',
    data: result,
  })
}

export let findOneCoursesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let id = req.params.courseId
  let result = await getSingleCoursesFromDb(id)

  res.status(200).json({
    status: true,
    message:
      (result as any)?.message || 'Courses retrieved successfully',
    data: result,
  })
}
export let deletedCoursesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let id = req.params.courseId
  let result = await deletecoursesFromDb(id)

  // res.send(result)

  res.status(200).json({
    status: true,
    message:
      (result as any)?.message || 'Courses Deleted successfully',
    data: result,
  })
}


export let updateCoursesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let id = req.params.courseId
  let result = await updateCoursesIntoDb(id,req.body)

  // res.send(result)

  res.status(200).json({
    status: true,
    message:
      (result as any)?.message || 'Courses Updated successfully',
    data: result,
  })


  
}



export const assignFacultiesWithCourse: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.courseId

    const {faculties} = req.body

    const result = await assignFacultyWithCourseIntoDB(id,faculties)

    res.status(200).json({
      status: true,
      messsage: 'CourseFaculty assign successfully',
      data: result,
    })
  } catch (err: any) {
    //  res.status(500).json({
    //     status:false,
    //     message:` ${err.message} ||something Wrong`,
    //     data:err
    // })

    // console.log("errroer",err)
    next(err)
  }
}



export const deleteFacultiesWithCourse: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.courseId

    const {faculties} = req.body

    const result = await removedFacultyWithCourseFromDB(id,faculties)

    res.status(200).json({
      status: true,
      messsage: 'CourseFaculty removed successfully',
      data: result,
    })
  } catch (err: any) {
    //  res.status(500).json({
    //     status:false,
    //     message:` ${err.message} ||something Wrong`,
    //     data:err
    // })

    // console.log("errroer",err)
    next(err)
  }
}