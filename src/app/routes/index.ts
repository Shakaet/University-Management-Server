import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { AcamedicsemRoutes } from "../modules/academicSem/academicSem.route";
import { AcamedicFacultyRoutes } from "../modules/academicFaculty/academinFaculty.route";





let router=Router()



let AllRoutes=[
    {
        path:"/students",
        routes:studentRoutes
    },
    {
        path:"/users",
        routes:userRoutes
    },
     {
        path:"/acamedicSem",
        routes:AcamedicsemRoutes
    },
    {
        path:"/acamedicFaculty",
        routes:AcamedicFacultyRoutes
    }
]



AllRoutes.forEach((route)=>router.use(route.path,route.routes))

// router.use("/students",studentRoutes)
// router.use("/users",userRoutes)


export default router