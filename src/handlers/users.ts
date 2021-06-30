import { Request, Response } from 'express'
import { User, UserStore } from '../models/users'
import { OrderStore } from '../models/orders'
import jwt from 'jsonwebtoken'

const store = new UserStore()
const oStore = new OrderStore()
const tokenSecret = process.env.TOKEN_SECRET as string

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await store.index()
        res.json(users)
    } catch(err) {
        res.status(400).json(err)
    }
}
const show = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    try {
        const user = await store.show(id)
        res.json(user)
    } catch(err) {
        res.status(400).json(err + id)
    }
}
const create = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        id: req.body.id,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    try {
        const newUser = await store.create(user)
        // When new user created also create new order
        if (newUser.id) oStore.create(newUser.id)
        var token = jwt.sign(newUser, tokenSecret)
        res.json(token)
    } catch(err) {
        res.status(400).json(err + user)
    }
}
const destroy = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    try {
        await store.delete(id)
        res.send(`User id ${id} deleted`)
    } catch (err) {
        res.status(400).json(err + id)
    }
}

export { index, show, create, destroy }