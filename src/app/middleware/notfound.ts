import express, { NextFunction, Request, Response } from 'express'

export let notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    status: false,
    message: 'API not Found',
    error: '',
  })
}
