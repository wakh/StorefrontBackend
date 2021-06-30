import { Router } from 'express'
import { index, show, create } from '../handlers/users'
import verifyAuthToken from '../utilities/verify'

const usersRoute = Router()

usersRoute.get('/', verifyAuthToken, index)
usersRoute.get('/:id', verifyAuthToken, show)
usersRoute.post('/', create)

export default usersRoute