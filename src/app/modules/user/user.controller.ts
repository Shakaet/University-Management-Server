import { changedUserStatusServices, createAdminIntoDB, createFacultyIntoDB, createStudentToDatabase, getMeServices } from './user.service'
import { Student } from '../student/student.interface'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { senResponse } from '../../utils/sendResponse'
import { catchAsynFunction } from '../../utils/catchAsync'
import { AppError } from '../../Errors/AppError'

// RequestHandler dile autometic req,res,next er type declard hoye jabe
export const createStudent = catchAsynFunction(async (req, res) => {
  let { password, student } = req.body

  let result = await createStudentToDatabase(password, student)

  // send response

  // res.status(200).json({
  //     status:true,
  //     message:(result as any)?.message || "student created successfully",
  //     data:result
  // })

  senResponse(res, 200, {
    status: true,
    message: (result as any)?.message || 'student created successfullyN',
    data: result,
  })
})


export const createFaculty = catchAsynFunction(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await createFacultyIntoDB(password, facultyData);

  senResponse(res, 200, {
    status: true,
    message: (result as any)?.message || 'Faculty is created succesfully',
    data: result,
  });
});

export const createAdmin = catchAsynFunction(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await createAdminIntoDB(password, adminData);

  senResponse(res,200, {
    status: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});


export const getMe = catchAsynFunction(async (req, res) => {
  

  let token = req.headers.authorization as string

  if(!token){

    throw new AppError(404,"you are unauthorized","")

  }

  const result = await getMeServices(token);

  senResponse(res,200, {
    status: true,
    message: 'getMe Access succesfully',
    data: result,
  });
});



export const changedUserStatus = catchAsynFunction(async (req, res) => {
  
     let id=req.params.id
 

  const result = await changedUserStatusServices(id,req.body);

  senResponse(res,200, {
    status: true,
    message: 'status changed succesfully',
    data: result,
  });
});