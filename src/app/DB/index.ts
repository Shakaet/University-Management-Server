import config from "../config"
import { user_role } from "../modules/user/user.constrain"
import { UserModel } from "../modules/user/user.model"

let superUser={
    id: "0001",
  email:"sktshakaet@gmail.com",
  password:config.SuperAdminPassword,
//   passwordChagedAt?:Date,
  needsPasswordChange: false,
  role: user_role.superAdmin,
  status: 'in-progress',
  isDeleted: false
}
export let seedSuperAdmin=async()=>{

    // when database is connected,we will check is there any user who is super admin

    let isSuperAdminExist=await UserModel.findOne({role:user_role.superAdmin})


    if(!isSuperAdminExist){
        await UserModel.create(superUser)
    }
    
}