import { Response } from "express";

export const badRequest = (res: Response, err: string) => 
    res.status(400).json({
        err
    })

export const notFound = (res: Response) => res.sendStatus(404);

export const ok = (res: Response) => res.sendStatus(200);

export const internalServerError = (res: Response, err: Error) => 
    res.status(500).json({
        err: err.message
    })

export const validateNumber = (num: any) => parseFloat(num) > 0
export const validateCPF = (num: any) => num === /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
export const validateCNPJ = (num: any) => num === /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
export const validateEmail = (email: any) => email === /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i