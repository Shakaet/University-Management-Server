import { Router } from 'express';
import { createAcademicSemester, findAllAcademicSemController, findAllAcademinSemController, findOneAcademicSemController, findOneAcademinSemController, updateAcademicSemController } from './academicSem.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createAcademicSemesterZod } from './academicsemValidate.jod';





    let router= Router()



    router.post("/create-acamedic-sem",validateRequest(createAcademicSemesterZod),createAcademicSemester)

    router.get("/allAcademicSemester",findAllAcademicSemController)
    router.get("/AcademicSemester/:semesterId",findOneAcademicSemController)
    router.patch("/AcademicSemester/:semesterId",updateAcademicSemController)

    export let AcamedicsemRoutes=router


    