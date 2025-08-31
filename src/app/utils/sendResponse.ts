import { Response } from 'express'

type Data<T> = {
  status: boolean
  message?: string
  data: T
}

export let senResponse = <T>(
  res: Response,
  statusCode: number,
  data: Data<T>,
) => {
  res.status(statusCode).json({
    status: data.status,
    message: data.message,
    data: data.data,
  })
}
