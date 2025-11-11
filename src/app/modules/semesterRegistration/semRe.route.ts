import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {  createSemesterRegistrationZodSchema, updateSemesterRegistrationZodSchema } from "./semRe.Zod";
import {  createSemesterRegistrationToDB, deleteSemesterRegistration, getAllSemesterRegistration, singleSemesterRegistration, updateSemesterRegistrationToDB } from "./semRe.controller";
import { user_role } from "../user/user.constrain";
import { auth } from "../../middleware/auth";





let router=Router()



 router.post(
   '/create-semester-Registration',
   auth(user_role.admin,user_role.superAdmin),
   validateRequest(createSemesterRegistrationZodSchema),
   createSemesterRegistrationToDB,
 )
 
 router.get('/allSemesterRegistration',
  auth(user_role.admin,user_role.superAdmin,user_role.faculty,user_role.student),
  getAllSemesterRegistration)
 router.get('/:id',
  auth(user_role.admin,user_role.superAdmin,user_role.faculty,user_role.student),
  singleSemesterRegistration)
 router.patch(
   '/:id',
   auth(user_role.admin,user_role.superAdmin),
   validateRequest(updateSemesterRegistrationZodSchema),
   updateSemesterRegistrationToDB,
 )



  router.delete('/:id',
    auth(user_role.admin,user_role.superAdmin),
    deleteSemesterRegistration)







export let semesterRegistrationRoutes=router