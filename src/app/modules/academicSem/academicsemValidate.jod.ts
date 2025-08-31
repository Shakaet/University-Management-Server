import { z } from "zod";

export const MonthEnum = z.enum([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const);

export const createAcademicSemesterZod = z.object({
    body: z
  .object({
    name: z.enum(["Autumn", "Summmar", "Fall"] as const),
    year:z.string(),
    code: z.enum(["01", "02", "03"] as const),
    startMonth: MonthEnum,
    endMonth: MonthEnum,
  })
  .strict()
})

export const updateAcademicSemesterZod = z.object({
  body: z
    .object({
      name: z.enum(["Autumn", "Summmar", "Fall"] as const).optional(),
      year: z.string().optional(),
      code: z.enum(["01", "02", "03"] as const).optional(),
      startMonth: MonthEnum.optional(),
      endMonth: MonthEnum.optional(),
    })
    .strict(),
});







// {
 
//     "name": "Autumn",
//     "year": "2025",
//     "code": "01",
//     "startMonth": "January",
//     "endMonth": "May"
  
// }
