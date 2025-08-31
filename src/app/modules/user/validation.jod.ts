import { z } from 'zod'

export const userZodSchema = z.object({
  //   id: z.string().min(1, "ID is required"), // cause id autogenerate hobe,client theke id ashbena
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .optional(), //client theke id ashteo pare abr nao ashte pare

  // egulo comment kora hoyeche cause egulo client theke pathano hobena

  //   needsPasswordChange: z.boolean().default(true),
  //   role: z.enum(["student", "admin", "faculty"]),
  //   status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  //   isDeleted: z.boolean().default(false),
})
