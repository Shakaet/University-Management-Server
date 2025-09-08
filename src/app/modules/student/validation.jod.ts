import { z } from 'zod'

// Enum schemas with custom messages using refine
const genderEnum = z.enum(['male', 'female', 'others'])
const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
])
const isActiveEnum = z.enum(['active', 'blocked'])

// Zod schema for Student
export const studentZodSchema = z.object({
  body: z.object({
    password: z.string().max(20),

    student: z.object({
      name: z.object({
        firstName: z
          .string()
          .min(2, { message: 'First name too small' })
          .refine(val => val.charAt(0) === val.charAt(0).toUpperCase(), {
            message: 'First name must start with a capital letter',
          }),
        middleName: z.string().optional(),
        lastName: z
          .string()
          .regex(/^[A-Za-z]+$/, {
            message: 'Last name must contain only letters',
          }),
      }),

      gender: genderEnum.refine(val => genderEnum.options.includes(val), {
        message: 'Gender is not supported',
      }),

      dateOfBirth: z.string().optional(),

      email: z.string().email({ message: 'Email is not valid' }),

      contactNo: z.string().nonempty({ message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .nonempty({ message: 'Emergency contact is required' }),

      bloodGroup: bloodGroupEnum.refine(
        val => bloodGroupEnum.options.includes(val),
        { message: 'Blood group is not valid' },
      ),

      presentAddress: z
        .string()
        .nonempty({ message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .nonempty({ message: 'Permanent address is required' }),

      guardian: z.object({
        fatherName: z.string().nonempty({ message: 'Father name is required' }),
        fatherOccupation: z
          .string()
          .nonempty({ message: 'Father occupation is required' }),
        fatherContactNo: z
          .string()
          .nonempty({ message: 'Father contact is required' }),
        motherName: z.string().nonempty({ message: 'Mother name is required' }),
        motherOccupation: z
          .string()
          .nonempty({ message: 'Mother occupation is required' }),
        motherContactNo: z
          .string()
          .nonempty({ message: 'Mother contact is required' }),
      }),

      localGuardian: z.object({
        name: z
          .string()
          .nonempty({ message: 'Local guardian name is required' }),
        occupation: z.string().nonempty({ message: 'Occupation is required' }),
        contactNo: z
          .string()
          .nonempty({ message: 'Contact number is required' }),
        address: z.string().nonempty({ message: 'Address is required' }),
      }),

      profileImg: z.string().optional(),
      addmissionSemester: z.string(),
       academicDepartment:z.string()
    }),
  }),
})


// Zod schema for updating Student (all optional)
export const updatedStudentsZodSchema = z.object({
  body: z.object({
    // password: z.string().max(20).optional(),

    student: z
      .object({
        name: z
          .object({
            firstName: z
              .string()
              .min(2, { message: 'First name too small' })
              .refine(val => val.charAt(0) === val.charAt(0).toUpperCase(), {
                message: 'First name must start with a capital letter',
              })
              .optional(),
            middleName: z.string().optional(),
            lastName: z
              .string()
              .regex(/^[A-Za-z]+$/, {
                message: 'Last name must contain only letters',
              })
              .optional(),
          })
          .optional(),

        gender: genderEnum
          .refine(val => genderEnum.options.includes(val), {
            message: 'Gender is not supported',
          })
          .optional(),

        dateOfBirth: z.string().optional(),

        email: z.string().email({ message: 'Email is not valid' }).optional(),

        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),

        bloodGroup: bloodGroupEnum
          .refine(val => bloodGroupEnum.options.includes(val), {
            message: 'Blood group is not valid',
          })
          .optional(),

        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),

        guardian: z
          .object({
            fatherName: z.string().optional(),
            fatherOccupation: z.string().optional(),
            fatherContactNo: z.string().optional(),
            motherName: z.string().optional(),
            motherOccupation: z.string().optional(),
            motherContactNo: z.string().optional(),
          })
          .optional(),

        localGuardian: z
          .object({
            name: z.string().optional(),
            occupation: z.string().optional(),
            contactNo: z.string().optional(),
            address: z.string().optional(),
          })
          .optional(),

        profileImg: z.string().optional(),
        addmissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .optional(),
  }),
})

// {

//     "password": "SecurePass123",
//     "student": {
//       "name": {
//         "firstName": "Shakaet",
//         "middleName": "Al",
//         "lastName": "Sakayet"
//       },
//       "gender": "male",
//       "dateOfBirth": "2000-05-15",
//       "email": "shakaet@example.com",
//       "contactNo": "01712345678",
//       "emergencyContactNo": "01812345678",
//       "bloodGroup": "A+",
//       "presentAddress": "Chittagong, Bangladesh",
//       "permanentAddress": "Chittagong, Bangladesh",
//       "guardian": {
//         "fatherName": "Abdul Karim",
//         "fatherOccupation": "Businessman",
//         "fatherContactNo": "01787654321",
//         "motherName": "Rahima Begum",
//         "motherOccupation": "Teacher",
//         "motherContactNo": "01887654321"
//       },
//       "localGuardian": {
//         "name": "Md. Hasan",
//         "occupation": "Engineer",
//         "contactNo": "01612345678",
//         "address": "Dhaka, Bangladesh"
//       },
//       "profileImg": "https://example.com/images/profile.png",
//       "addmissionSemester": "68b3fffd1b0025f5a206bf46"
//     }

// }
