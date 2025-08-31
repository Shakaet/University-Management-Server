import { Router } from 'express';
import { createAcademicSemester, findAllAcademicSemController, findAllAcademinSemController, findOneAcademicSemController, findOneAcademinSemController, updateAcademicSemController } from './academicSem.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createAcademicFacultyController, findOneAcademicFacultyController, updateAcademicFacultyController } from './academicFaculty.controller';
import { findAllAcademicFaculty } from './academicFaculty.service';






    let router= Router()



    router.post("/create-acamedic-Faculty",createAcademicFacultyController)

    router.get("/allAcademicFacalty",findAllAcademicFaculty)
    router.get("/AcademicFaculty/:FacultyId",findOneAcademicFacultyController)
    router.patch("/AcademicFaculty/:FacultyId",updateAcademicFacultyController)

    export let AcamedicFacultyRoutes=router


    