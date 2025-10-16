


export let user_role={

    student:"student",
    admin:"admin",
    faculty:"faculty"

} as const


// export type TuseRole={
    
//     student:"student",
//     admin:"admin",
//     faculty:"faculty"


// }

export type TuseRole= keyof typeof user_role