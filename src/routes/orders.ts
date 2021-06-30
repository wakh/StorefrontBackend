import { Router } from 'express'
import { show, showCurrent, indexCompleted } from '../handlers/orders'
import verifyAuthToken from '../utilities/verify'

const ordersRoute = Router()

ordersRoute.get('/current/:uid', verifyAuthToken, showCurrent)
ordersRoute.get('/completed/:uid', verifyAuthToken, indexCompleted)

export default ordersRoute