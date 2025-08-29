import { Router } from 'express';
import { createAcademicSemester } from './academicSem.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createAcademicSemesterZod } from './academicsemValidate.jod';




    let router= Router()



    router.post("/create-acamedic-sem",validateRequest(createAcademicSemesterZod),createAcademicSemester)




    export let AcamedicsemRoutes=router


    