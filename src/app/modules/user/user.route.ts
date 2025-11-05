import express, { NextFunction, Request } from 'express'
import { changedUserStatus, createAdmin, createFaculty, createStudent, getMe } from './user.controller'
import { ZodObject } from 'zod'
import { studentZodSchema } from '../student/validation.jod'
import { validateRequest } from '../../middleware/validateRequest'
import { createFacultyZodSchema } from '../faculty/validation.zod'
import { createAdminSchema } from '../admin/validation.zod'
import { auth } from '../../middleware/auth'
import { user_role } from './user.constrain'
import { changedStatusZodSchema } from './validation.jod'
import { upload } from '../../utils/sendImagetoCloudinary'

const router = express.Router()

// will call controller function
router.post('/create-student',
  auth(user_role.admin),
  // file mane file ta je name pathabo ekn file namei pathacchi
  upload.single("file"),
  // parse data text to json
  (req:Request,res:Response,next:NextFunction)=>{

    req.body= JSON.parse(req.body.data)
    // console.log(req.body)
    next()

  },
   validateRequest(studentZodSchema),
    createStudent)
router.post(
  '/create-faculty',
  auth(user_role.admin),
  upload.single("file"),
  (req:Request,res:Response,next:NextFunction)=>{

    req.body= JSON.parse(req.body.data)
    // console.log(req.body)
    next()

  },

  validateRequest(createFacultyZodSchema),
  createFaculty,
);

router.post(
  '/create-admin',
   upload.single("file"),
  (req:Request,res:Response,next:NextFunction)=>{

    req.body= JSON.parse(req.body.data)
    // console.log(req.body)
    next()

  },
  validateRequest(createAdminSchema),
   createAdmin,
);

router.get(
  '/me',
   auth(user_role.admin,user_role.student,user_role.faculty),
   getMe,
);

router.post(
  '/changed-status/:id',
   auth(user_role.admin),
   validateRequest(changedStatusZodSchema),
   changedUserStatus,
);



export const userRoutes = router
