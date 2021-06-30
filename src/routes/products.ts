import { Router } from 'express'
import { index, show, create, indexCategory, topFive } from '../handlers/products'
import verifyAuthToken from '../utilities/verify'

const productsRoute = Router()

productsRoute.get('/', index)
productsRoute.get('/:id', show)
productsRoute.post('/', verifyAuthToken, create)
productsRoute.get('/category/:category', indexCategory)
productsRoute.get('/util/topfive', topFive)

export default productsRoute