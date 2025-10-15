import { Router } from 'express'
import { studentRoutes } from '../modules/student/student.route'
import { userRoutes } from '../modules/user/user.route'
import { AcamedicsemRoutes } from '../modules/academicSem/academicSem.route'
import { AcamedicFacultyRoutes } from '../modules/academicFaculty/academinFaculty.route'
import { AcamedicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { CourseRoutes } from '../modules/course/course.route'
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semRe.route'
import { offerCouresRoutes } from '../modules/offerCourses/offerCourse.route'
import { authRoute } from '../modules/Auth/auth.route'


let router = Router()

let AllRoutes = [
  {
    path: '/students',
    routes: studentRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/acamedicSem',
    routes: AcamedicsemRoutes,
  },
  {
    path: '/acamedicFaculty',
    routes: AcamedicFacultyRoutes,
  },
  {
    path: '/acamedicDepartment',
    routes: AcamedicDepartmentRoutes,
  },
  {
    path: '/faculty',
    routes: FacultyRoutes,
  },
  {
    path: '/admin',
    routes: AdminRoutes,
  },
  {
    path:"/course",
    routes:CourseRoutes,
  },
  {
    path:"/sem-Registration",
    routes:semesterRegistrationRoutes,
  },
  {
    path:"/offer-courses",
    routes:offerCouresRoutes,
  },
  {
    path:"/auth",
    routes:authRoute,
  }
]

AllRoutes.forEach(route => router.use(route.path, route.routes))

// router.use("/students",studentRoutes)
// router.use("/users",userRoutes)

export default router
