import Joi from "joi";

  export const studentJoiSchema = Joi.object({
  id: Joi.string().required(),

  name: Joi.object({
    firstName: Joi.string()
      .min(2)
      .pattern(/^[A-Z][a-z]*$/)
      .required()
      .messages({
        "string.empty": "FirstName is required",
        "string.min": "First name too small",
        "string.pattern.base": "First name must start with a capital letter",
      }),
    middleName: Joi.string().allow("").optional(),
    lastName: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.empty": "LastName is required",
        "string.pattern.base": "LastName must contain only letters",
      }),
  }).required(),

  gender: Joi.string()
    .valid("male", "female", "others")
    .required()
    .messages({
      "any.only": "{#value} is not supported",
      "string.empty": "Gender is required",
    }),

  dateOfBirth: Joi.string().optional(),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email is not valid",
      "string.empty": "Email is required",
    }),

  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),

  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.only": "{#value} is not a valid blood group",
      "string.empty": "Blood group is required",
    }),

  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),

  guardian: Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  }).required(),

  localGuardian: Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  }).required(),

  profileImg: Joi.string().optional(),

  isActive: Joi.string()
    .valid("active", "blocked")
    .default("active"),
});

