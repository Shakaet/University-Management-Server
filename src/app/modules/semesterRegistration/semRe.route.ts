import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {  createSemesterRegistrationZodSchema, updateSemesterRegistrationZodSchema } from "./semRe.Zod";
import {  createSemesterRegistrationToDB, getAllSemesterRegistration, singleSemesterRegistration, updateSemesterRegistrationToDB } from "./semRe.controller";





let router=Router()



 router.post(
   '/create-semester-Registration',
   validateRequest(createSemesterRegistrationZodSchema),
   createSemesterRegistrationToDB,
 )
 
 router.get('/allSemesterRegistration',getAllSemesterRegistration)
 router.get('/:id',singleSemesterRegistration)
 router.patch(
   '/:id',
   validateRequest(updateSemesterRegistrationZodSchema),
   updateSemesterRegistrationToDB,
 )







export let semesterRegistrationRoutes=router