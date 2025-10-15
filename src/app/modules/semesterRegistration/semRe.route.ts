import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {  createSemesterRegistrationZodSchema, updateSemesterRegistrationZodSchema } from "./semRe.Zod";
import {  createSemesterRegistrationToDB, deleteSemesterRegistration, getAllSemesterRegistration, singleSemesterRegistration, updateSemesterRegistrationToDB } from "./semRe.controller";





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



  router.delete('/:id',deleteSemesterRegistration)







export let semesterRegistrationRoutes=router