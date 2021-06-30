import { Order, OrderStore } from '../../models/orders'
import db from '../../database'
import query from '../../utilities/query'

describe('Orders Model', () => {
    const store = new OrderStore()
    beforeAll(async () => {
        const sql = 'INSERT INTO orders (user_id, status)'
            + ' VALUES ($1, $2) RETURNING *;'
        await query(db, sql, ['test1', 'TRUE'])
        await query(db, sql, ['test1', 'FALSE'])
        await query(db, sql, ['test1', 'TRUE'])
        await query(db, sql, ['test2', 'TRUE'])
        await query(db, sql, ['test2', 'FALSE'])
    })
    it('index', async () => {
        const orders: Order[] = await store.index()
        expect(orders.length).toEqual(5)
    })
    it('indexCompleted', async () => {
        const orders: Order[] = await store.indexCompleted('test1')
        expect(orders.length).toEqual(2)
    })
    it('show', async () => {
        const order: Order = await store.show('4')
        expect(order.user_id).toEqual('test2')
    })
    it('showCurrent', async () => {
        const order: Order = await store.showCurrent('test1')
        expect(order.id).toEqual(2)
    })
    it('create', async () => {
        const newOrder: Order= await store.create('test3')
        expect(newOrder.user_id).toEqual('test3')
    })
    it('complete', async () => {
        const order: Order = await store.complete('4')
        expect(order.status).toBeFalse
    })
    it('delete', async () => {
        const order: Order = await store.delete('5')
        expect(order.user_id).toEqual('test2')
    })
})