import { Schema, model } from 'mongoose'
import { TacademicSemester } from './academicSem.interface'
import { AppError } from '../../Errors/AppError'

const academicSemesterSchema = new Schema<TacademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summmar', 'Fall'],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    endMonth: {
      type: String,
      required: true,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  },
  {
    timestamps: true,
  },
)

academicSemesterSchema.pre('save', async function (next) {
  // ei next ta hocche mongoose er next

  let ExistingYearName = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  })

  if (ExistingYearName) {
    throw new AppError(404,'Academic Semister Already exist',"")
  }
  next()

  // Autumn= 01
  // Summar= 02
  // Fall= 03
})

export const AcademicSemesterModel = model(
  'AcademicSemester',
  academicSemesterSchema,
)
