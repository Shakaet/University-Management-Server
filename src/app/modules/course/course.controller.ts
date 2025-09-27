import { NextFunction, Request, Response } from 'express'
import { catchAsynFunction } from '../../utils/catchAsync'
import { creeateCoursesIntoDb, deletecoursesFromDb, getAllCoursesFromDb, getSingleCoursesFromDb } from './course.service'



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
  let result = await getAllCoursesFromDb()

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
  let id = req.params.CoursesId
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
