import { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orders'
import { OrderProduct, OrderEx, OrderProductStore } from '../models/order_products'

const store = new OrderStore()
const opStore = new OrderProductStore()

const show = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    try {
        const op = {} as OrderEx
        op.oInfo = await store.showCurrent(id)
        op.products = await opStore.getProductInfo(await opStore.indexByOrder(id.toString()))
        res.json(op)
    } catch (err) {
        res.status(400).send(err + id)
    }
}
const showCurrent = async (req: Request, res: Response): Promise<void> => {
    const uid = req.params.uid
    try {
        const op = {} as OrderEx
        op.oInfo = await store.showCurrent(uid)
        if (op.oInfo.id) op.products = await opStore.getProductInfo(
            await opStore.indexByOrder(op.oInfo.id.toString()))
        res.json(op)
    } catch (err) {
        res.status(400).send(err + uid)
    }
}
const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch (err) {
        res.status(400).send(err)
    }
}
const indexCompleted = async (req: Request, res: Response): Promise<void> => {
    const uid = req.params.uid
    try {
        const orders = await store.indexCompleted(uid)
        res.json(orders)
    } catch (err) {
        res.status(400).send(err + uid)
    }
}
const create = async (req: Request, res: Response): Promise<void> => {
    const uid = req.params.uid
    try {
        const newOrder = await store.create(uid)
        res.json(newOrder)
    } catch (err) {
        res.status(400).send(err + uid)
    }
}
const destroy = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    try {
        const order: Order = await store.show(id)
        await store.delete(id)
        if (order.status) await store.create(order.user_id.toString())
        res.send(`Order id ${id} deleted`)
    } catch (err) {
        res.status(400).send(err + id)
    }
}
const add = async (req: Request, res: Response): Promise<void> => {
    const op: OrderProduct = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    try {
        const newOrderProduct = await opStore.create(op)
        res.json(newOrderProduct)
    } catch (err) {
        res.status(400).send(err + op)
    }
}
const complete = async (req: Request, res: Response): Promise<void> => {
    const oid = req.params.oid
    try {
        const order = await store.complete(oid)
        if (!order.status) await store.create(order.user_id.toString())
        res.json(order)
    } catch (err) {
        res.status(400).send(err + oid)
    }
}

export { show, showCurrent, indexCompleted, create, add, index, destroy, complete }