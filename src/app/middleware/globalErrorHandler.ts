import express, { NextFunction, Request, Response } from 'express'

export let globarError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.StatusCode || 500
  const message = err.message || 'Something Went Wrong'

  return res.status(statusCode).json({
    status: false,
    message,
    error: err,
  })
}
