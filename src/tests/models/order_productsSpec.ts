import { OrderProduct, ProductEx, OrderProductStore } from '../../models/order_products'
import db from '../../database'
import query from '../../utilities/query'

describe('OrderProduct model', () => {
    const store = new OrderProductStore()
    beforeAll(async () => {
        const sql = 'INSERT INTO order_products (order_id, product_id, quantity)'
            + ' VALUES ($1, $2, $3);'
        await query(db, sql, ['1', '1', '1'])
        await query(db, sql, ['1', '2', '1'])
        await query(db, sql, ['1', '3', '1'])
        await query(db, sql, ['1', '4', '1'])
        await query(db, sql, ['1', '5', '1'])
        await query(db, sql, ['1', '6', '1'])
        await query(db, sql, ['2', '2', '2'])
        await query(db, sql, ['2', '3', '3'])
        await query(db, sql, ['2', '4', '4'])
        await query(db, sql, ['2', '5', '5'])
        await query(db, sql, ['2', '6', '6'])
    })
    it('index', async () => {
        const ops: OrderProduct[] = await store.index()
        expect(ops.length).toEqual(11)
    })
    it('indexByOrder', async () => {
        const ops: OrderProduct[] = await store.indexByOrder('1')
        expect(ops.length).toEqual(6)
    })
    it('show', async () => {
        const op: OrderProduct = await store.show('2', '5')
        expect(op.quantity).toEqual(5)
    })
    it('topFive', async () => {
        const ops: OrderProduct[] = await store.topFive()
        expect(ops.length).toEqual(5)
    })
    it('create', async () => {
        const op: OrderProduct = {
            order_id: 2,
            product_id: 1,
            quantity: 1
        }
        const newOp: OrderProduct = await store.create(op)
        expect(newOp.quantity).toEqual(1)
        const existOp: OrderProduct = await store.create(op)
        expect(existOp.quantity).toEqual(2)
    })
    it('delete', async () => {
        const op: OrderProduct = await store.delete('2', '6')
        expect(op.quantity).toEqual(6)
    })
})