import db from '../database'
import query from '../utilities/query'
import { Product, ProductStore } from './products'
import { Order } from './orders'

const pStore = new ProductStore()
export type OrderProduct = {
    order_id: number
    product_id: number
    quantity: number
}

export type ProductEx = {
    pInfo: Product
    quantity: number
}

export type OrderEx = {
    oInfo: Order
    products: ProductEx[]
}

export class OrderProductStore {
    async index(): Promise<OrderProduct[]> {
        try {
            const sql = 'SELECT * FROM order_products;'
            return (await query(db, sql)).rows
        } catch (err) {
            throw new Error(`Could not index order products. Error: ${err}`)
        }
    }
    async indexByOrder(oid: string): Promise<OrderProduct[]> {
        try {
            const sql = 'SELECT * FROM order_products WHERE order_id=($1);'
            return (await query(db, sql, [oid])).rows
        } catch(err) {
            throw new Error(`Could not index order products with order id ${oid}. Error: ${err}`)
        }
    }
    async show(oid: string, pid: string): Promise<OrderProduct> {
        try {
            const sql = 'SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2);'
            return (await query(db, sql, [oid, pid])).rows[0]
        } catch(err) {
            throw new Error(`Could not show order product with order id ${oid} and product_id ${pid}: Error: ${err}`)
        }
    }
    async topFive(): Promise<OrderProduct[]> {
        try {
            const sql = 'SELECT product_id, SUM(quantity) AS quantity'
                + ' FROM order_products GROUP BY product_id'
                + ' ORDER BY quantity DESC LIMIT 5;'
            return (await query(db, sql)).rows
        } catch(err) {
            throw new Error(`Could not get five most popular products. Error: ${err}`)
        }
    }
    async create(op: OrderProduct): Promise<OrderProduct> {
        try {
            const sql1 = 'UPDATE order_products SET quantity=$1'
                + ' WHERE order_id=$2 AND product_id=$3 RETURNING *;';
            const sql2 = 'INSERT INTO order_products (order_id, product_id, quantity)'
                + ' VALUES ($1, $2, $3) RETURNING *;'
            const exist: OrderProduct = await this.show(op.order_id.toString(), op.product_id.toString())
            if (exist) return (await query(db, sql1, [
                exist.quantity + op.quantity, op.order_id, op.product_id])).rows[0]
            return (await query(db, sql2, [op.order_id, op.product_id, op.quantity])).rows[0]
        } catch (err) {
            throw new Error(`Could not add product id ${op.product_id} into order id ${op.order_id}. Error: ${err}`)
        }
    }
    async delete(oid: string, pid: string): Promise<OrderProduct> {
        try {
            const sql = 'DELETE FROM order_products WHERE order_id=$1 AND product_id=$2 RETURNING *;'
            return (await query(db, sql, [oid, pid])).rows[0]
        } catch (err) {
            throw new Error(`Could not delete order product with order id ${oid} and product id ${pid}. Error: ${err}`)
        }
    }
    async getProductInfo(opqs: OrderProduct[]): Promise<ProductEx[]> {
        const pStocks = {} as ProductEx[]
        await Promise.all(opqs.map(async x => {
            const pStock = {} as ProductEx
            pStock.pInfo = await pStore.show(x.product_id.toString())
            pStock.quantity = x.quantity
            pStocks.push(pStock)
        }))
        return pStocks
    }
}