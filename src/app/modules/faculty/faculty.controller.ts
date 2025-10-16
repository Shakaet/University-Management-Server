import httpStatus from 'http-status';


import { catchAsynFunction } from '../../utils/catchAsync';
import { senResponse } from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsynFunction(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB( id );

  res.status(200).json({
      status: true,
      messsage: 'faculty is retrive successfully',
      data: result,
    })
});

const getAllFaculties = catchAsynFunction(async (req, res) => {

  // console.log("test",req.user)
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  res.status(200).json({
      status: true,
      messsage: 'faculty are retrive Successfully',
      data: result,
    })
});

const updateFaculty = catchAsynFunction(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB( id , faculty);

  res.status(200).json({
      status: true,
      messsage: 'Faculty is updated succesfully',
      data: result,
    })
});

const deleteFaculty = catchAsynFunction(async (req, res) => {
  const {  id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

 res.status(200).json({
      status: true,
      messsage: 'Faculty is deleted succesfully',
      data: result,
    })
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};