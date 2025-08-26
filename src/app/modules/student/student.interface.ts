

// step1: interface(if use ts)
// step2: schema
// step3: model
// step4:db query
import {  Model, Types } from 'mongoose';


 export type Name= {
    firstName:string,
    middleName?:string,
    lastName:string
  };

export type Guardian= {
    fatherName:string,
    fatherOccupation:string,
    fatherContactNo:string,
    motherName:string,
    motherOccupation:string,
    motherContactNo:string
  }


 

  export type LocalGuardian={
    name:string,
    occupation:string,
    contactNo:string,
    address:string
  }

export type  Student=  {
  id:string,
  user:Types.ObjectId,
  password:string,
  name:Name,
  gender:"male"|"female"|"others",
  dateOfBirth?:string,
  email: string;
  contactNo:string,
  emergencyContactNo:string,
  bloodGroup?: "A+"| "A-"| "B+"| "B-"| "AB+"| "AB-"| "O+"| "O-";
  presentAddress:string,
  permanentAddress:string,
  guardian:Guardian,
  localGuardian:LocalGuardian,
  profileImg?:string,
  isDeleted:boolean
}


// custom instance method

// 👉 Instance methods এর জন্য আলাদা টাইপ
export type StudentMethods= {
  isUserExist(id: string): Promise<Student | null>;
}

// custom static method

interface StudentStatics extends Model<Student> {
  myStaticMethod(id: string):Promise<Student | null>;
}







// 👉 Model টাইপ
// export type StudentModel = Model<Student, {}, StudentMethods>;{} mane holo kono statics method nai

export type StudentModel = Model<Student, StudentStatics, StudentMethods>;





