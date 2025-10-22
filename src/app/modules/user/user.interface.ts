export type TUser = {
  id: string,
  email:string,
  password: string
  passwordChagedAt?:Date,
  needsPasswordChange: boolean
  role: 'student' | 'admin' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

// export type NewUser={
//     password:string,
//     role:string,
//     id:string

//   }
