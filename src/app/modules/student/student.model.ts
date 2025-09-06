import { Schema, model, Types } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  Name,
  Student,
  StudentMethods,
  StudentModel,
} from './student.interface'
import validator from 'validator'
import bcrypt from 'bcrypt'
import config from '../../config'
import { AppError } from '../../Errors/AppError'

const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    minLength: [2, 'first name t00o small'],
    required: [true, 'FirstName is required'],
    trim: true,
    validate: {
      validator: function (val: string) {
        //  console.log("firstName",val)
        const capitalized =
          val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()

        return capitalized === val
      },
      // message:"{VALUE} is not correct"
      message: props => `${props.value} is not correct!`,
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required'],
    trim: true,
    validate: {
      validator: (val: string) => {
        return validator.isAlpha(val)
      },
      message: 'its must string',
    },
  },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

//  Create a Schema corresponding to the document interface.
export const studentSchema = new Schema<Student, StudentModel, StudentMethods>(
  {
    id: { type: String, required: true, unique: [true, 'ID is Required'] },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user Id is Required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: nameSchema,
      required: [true, 'name is required'],
    },

    //enum type

    //   gender: {
    //   type: String,
    //   enum: ["male", "female"],
    //   required: true
    // }
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (val: string) => validator.isEmail(val),
        message: '{VALUE} is not valid email',
      },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    // bloodGroup:["A+", "A-","B+","B-","AB+","AB-", "O+", "O-"],
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    addmissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment:{
       type: Schema.Types.ObjectId,
      ref: 'academicDepartment',

    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// virtual in mongoose

// studentSchema.virtual("fullName").get(function(){

//   return this.name.firstName + " " + this.name.middleName + " " + this.name.lastName;

// })

/// middleware
// totoal middleware 3 ta(document middleware,query and aggregation middleware)

//document middleware

// pre save middleware,(document save howar age kaj kore)

// studentSchema.pre('save', async function(next) {
//   console.log(this,'data will be added'); // Will be executed

//   const student=this // here this refers to documents
//    student.password=await bcrypt.hash(student.password,Number(config.bcryptHash));
//    next()
// });

// studentSchema.post('save', function(doc,next) {

//   doc.password=""
//   next()
//   // console.log(this,'data save in DB'); // Will be executed
// });

// query middleware

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// aggregate middleware

// this.pipeline() eta diye aggeration pipeline array take bujay ar unshift diye array r prothome ekta notun stage jog kortechi jeta match korteche jegulo isDeleted true na

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

/// custom instance method
studentSchema.methods.isUserExist = async function (id: string) {
  const result = await studentmodel.findOne({ id })
  return result
}

///custom static method

studentSchema.statics.myStaticMethod = async function (id: string) {
  const result = await studentmodel.findOne({ id })
  return result
}






//. Create a Model.
export const studentmodel = model<Student, StudentModel>(
  'Student',
  studentSchema,
)
