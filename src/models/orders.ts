import db from '../database'
import { OrderProductStore } from './order_products'
import query from '../utilities/query'

const opStore = new OrderProductStore()

export type Order = {
    id?: number
    user_id: string
    status: boolean
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders;'
            return (await query(db, sql)).rows
        } catch (err) {
            throw new Error(`Could not index orders. Error: ${err}`)
        }
    }
    async indexCompleted(uid: string): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=TRUE;'
            return (await query(db, sql, [uid])).rows
        } catch(err) {
            throw new Error(`Could not show completed orders with user '${uid}'. Error: ${err}`)
        }
    }
    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=$1;'
            return (await query(db, sql, [id])).rows[0]
        } catch (err) {
            throw new Error(`Could not show order ${id}. Error: ${err}`)
        }
    }
    async showCurrent(uid: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=FALSE;'
            const order: Order = (await query(db, sql, [uid])).rows[0]
            return order
        } catch(err) {
            throw new Error(`Could not show current order with user '${uid}'. Error: ${err}`)
        }
    }
    async create(uid: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id)'
                + 'VALUES ($1) RETURNING *;'
            return (await query(db, sql, [uid])).rows[0]
        } catch(err) {
            throw new Error(`Could not create order with user '${uid}'. Error: ${err}`)
        }
    }
    async complete(id: string): Promise<Order> {
        try {
            const sql = 'UPDATE orders SET status=($1) WHERE id=($2) RETURNING *;'
            return (await query(db, sql, ['FALSE', id])).rows[0]
        } catch(err) {
            throw new Error(`Could not complete order '${id}'. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *;'
            return (await query(db, sql, [id])).rows[0]
        } catch(err) {
            throw new Error(`Could not delete order '${id}'. Error: ${err}`)
        }
    }
}