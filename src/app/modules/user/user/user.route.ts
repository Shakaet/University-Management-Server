
import express from "express"
import { createStudent } from "./user.controller"







const router= express.Router()




// will call controller function
router.post("/create-student",createStudent)



export const userRoutes=router


