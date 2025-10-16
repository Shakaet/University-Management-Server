import { model, Schema } from 'mongoose'

import bcrypt from 'bcrypt'
import config from '../../config'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select:0 },
    passwordChagedAt:{type:Date},
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['student', 'admin', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

userSchema.pre('save', async function (next) {
  let student = this
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcryptHash),
  )

  next()
})

userSchema.post('save', async function (doc, next) {
  doc.password = ''

  next()
})

export const UserModel = model<TUser>('User', userSchema)
