import {NextFunction, Request, Response} from "express";
const myUserName = "admin"
const myPassword = "qwerty"
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization || ''
    const token = header.split(/\s+/).pop() || ''
    const auth = Buffer.from(token, 'base64').toString().split(/:/)
    const username = auth.shift()
    const password = auth.pop()

    if(myUserName !== username || myPassword !== password){
        res.status(401).send()
        return
    }

    next()
}