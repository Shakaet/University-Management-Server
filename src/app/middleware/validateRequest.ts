import { NextFunction, Request, Response } from 'express'
import { ZodObject } from 'zod'

export let validateRequest: any = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // // console.log(req.body.student)
    // console.log(`hello hi ${hh}`)

    try {
      //validate check
      await schema.parseAsync({
        body: req.body,
      })

      next()
    } catch (err) {
      next(err)
    }
  }
}
