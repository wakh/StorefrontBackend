import { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import { OrderProductStore } from '../models/order_products'

const store = new ProductStore()
const opStore = new OrderProductStore()

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.index()
        res.json(products)
    } catch (err) {
        res.status(400).json(err)
    }
}
const indexCategory = async (req: Request, res: Response): Promise<void> => {
    const category = req.params.category
    try {
        const products = await store.indexCategory(category)
        res.json(products)
    } catch (err) {
        res.status(400).json(err + category)
    }
}
const show = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    try {
        const product = await store.show(id)
        res.json(product)
    } catch (err) {
        res.status(400).json(err + id)
    }
}
const create = async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }
    try {
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400).json(err + product)
    }
}
const destroy = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    try {
        await store.delete(id)
        res.send(`Product id ${id} deleted`)
    } catch (err) {
        res.status(400).json(err + id)
    }
}
const topFive = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await opStore.topFive()
        res.json(products)
    } catch (err) {
        res.status(400).json(err)
    }
}

export { index, indexCategory, show, create, topFive, destroy }