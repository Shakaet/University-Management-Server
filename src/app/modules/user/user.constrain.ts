


export let user_role={
    
    student:"student",
    admin:"admin",
    faculty:"faculty",
    superAdmin:"super-admin"

} as const


// export type TuseRole={
    
//     student:"student",
//     admin:"admin",
//     faculty:"faculty"


// }

// export type TuseRole= keyof typeof user_role
export type TuseRole = (typeof user_role)[keyof typeof user_role];
