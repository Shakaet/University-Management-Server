import { Student } from './../student/student.interface';
import { TacademicSemester } from './../academicSem/academicSem.interface'
import { object } from 'joi'
import config from '../../config'
import { Student } from '../student/student.interface'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { studentmodel } from '../student/student.model'
import { v4 as uuid } from 'uuid'
import { AcademicSemesterModel } from '../academicSem/academicSem.model'
import { generateAdminId, generatedStudentId, generateFacultyId } from './user.utils'
import { AppError } from '../../Errors/AppError'
import mongoose from 'mongoose'
import { Faculty } from '../faculty/faculty.model';
import { TFaculty } from '../faculty/faculty.interface';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import Admin from '../admin/admin.model';

export const createStudentToDatabase = async (
  password: string,
  student: Student,
) => {
  const userData: Partial<TUser> = {}

  if (!password) {
    userData.password = config.Password as string
  } else {
    userData.password = password
  }

  // create user role

  userData.role = 'student'
  // set email
  userData.email=student.email

  // find Students academic semester

  let studentsAcademicSemester = await AcademicSemesterModel.findById(
    student.addmissionSemester,
  )

  if (!studentsAcademicSemester) {
    throw new AppError(404,'AcademicId is not valid',"")
  }
  let email=student.email
  let isstudent=await studentmodel.findOne({email})

  if(isstudent){
    throw new AppError(404,"student already exists","")
  }


  let session=await mongoose.startSession()


  try{

     session.startTransaction()

      userData.id = await generatedStudentId(studentsAcademicSemester)
  // userData.id=uuid()
   
  // transaction 1
  //create users
  let newUser = await UserModel.create([userData],{session})

  // create students

  if (!newUser.length) {
    throw new AppError(404,"user not created","")
   
  }
   student.id = newUser[0].id
    student.user = newUser[0]._id
    
    // transaction 2
    let newStudent = await studentmodel.create([student],{session})

    if(!newStudent.length){
      throw new AppError(404,"student not created","")
    }

     await session.commitTransaction()
    await session.endSession()


    return newStudent

   
  }catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw new Error("failed to Create Students")

  }


}


export const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.Password as string);

  //set student role
  userData.role = 'faculty';
  // set email
  userData.email=payload.email

  // find academic department info
  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new Error('Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new Error( 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new Error( 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.Password as string);

  //set student role
  userData.role = 'admin';

  // set email
  userData.email=payload.email

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new Error('Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new Error('Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

