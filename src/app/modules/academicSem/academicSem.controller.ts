import { NextFunction, Request, Response } from 'express'
import { catchAsynFunction } from '../../utils/catchAsync'
import { senResponse } from '../../utils/sendResponse'
import {
  createAcademicSemToDb,
  findAllAcademicSemester,
  findOneAcademicSemester,
  updateAcademicSem,
} from './academicSem.service'

// RequestHandler dile autometic req,res,next er type declard hoye jabe
export const createAcademicSemester = catchAsynFunction(async (req, res) => {
  let payload = req.body

  let result = await createAcademicSemToDb(payload)

  // send response

  res.status(201).json({
    status: true,
    message:
      (result as any)?.message || 'Academic Semester created successfully',
    data: result,
  })

  // senResponse(res,200,{
  //     status:true,
  //     message:(result as any)?.message || "student created successfullyN",
  //      data:result
  // })
})

export let findAllAcademicSemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let result = await findAllAcademicSemester()

  res.send(result)
}

export let findOneAcademicSemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let id = req.params.semesterId
  let result = await findOneAcademicSemester(id)

  res.send(result)
}

export let updateAcademicSemController = catchAsynFunction( async (
  req,
  res,
) => {
  let id = req.params.semesterId
  let data = req.body
  let result = await updateAcademicSem(id, data)

  // res.send(result)

  res.status(200).json({
    status: true,
    message:
      (result as any)?.message || 'Academic Semester updated successfully',
    data: result,
  })
}
)