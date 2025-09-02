import { NextFunction, Request, Response } from 'express'
import { catchAsynFunction } from '../../utils/catchAsync'
import { createAcademicDepartmentToDb, findAllAcademicDepartment, findOneAcademicDepartment, updateAcademicDepartment } from './academicDepartment.service'

// RequestHandler dile autometic req,res,next er type declard hoye jabe
export const createAcademicDepartmentController = catchAsynFunction(
  async (req, res) => {
    let payload = req.body

    let result = await createAcademicDepartmentToDb(payload)

    // send response

    res.status(201).json({
      status: true,
      message:
        (result as any)?.message || 'Academic Department created successfully',
      data: result,
    })

    // senResponse(res,200,{
    //     status:true,
    //     message:(result as any)?.message || "student created successfullyN",
    //      data:result
    // })
  },
)

export let findAllAcademicDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let result = await findAllAcademicDepartment()

  res.send(result)
}

export let findOneAcademicDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let id = req.params.DepartmentId
  let result = await findOneAcademicDepartment(id)

  res.send(result)
}
export let updateAcademicFacultyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let id = req.params.DepartmentId
  let data = req.body
  let result = await updateAcademicDepartment(id, data)

  // res.send(result)

  res.status(200).json({
    status: true,
    message:
      (result as any)?.message || 'Academic Department updated successfully',
    data: result,
  })
}
