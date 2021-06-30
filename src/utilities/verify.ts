import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN_SECRET as string

const verifyAuthToken = (req: Request, res: Response, next: Function): void => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        req.body.user = jwt.verify(token, tokenSecret)
        next()
    } catch (err) {
        res.status(401).send(err)
    }
}

export default verifyAuthToken