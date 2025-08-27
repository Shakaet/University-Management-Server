import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user/user.route";




let router=Router()



let AllRoutes=[
    {
        path:"/students",
        routes:studentRoutes
    },
    {
        path:"/users",
        routes:userRoutes
    }
]



AllRoutes.forEach((route)=>router.use(route.path,route.routes))

// router.use("/students",studentRoutes)
// router.use("/users",userRoutes)


export default router