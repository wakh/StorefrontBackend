import request, { Response } from 'supertest'
import app from '../../server'
import jwt from 'jsonwebtoken'
import db from '../../database'
import query from '../../utilities/query'
import bcrypt from 'bcrypt'

const tokenSecret = process.env.TOKEN_SECRET as string
const password = bcrypt.hashSync(
    'pass123' + process.env.BCRYPT_PASSWORD,
    parseInt(process.env.SALT_ROUNDS as string)
)
const token = jwt.sign({
    id: 'test1',
    password: password,
    firstName: 'Test1',
    lastName: 'Test1'
}, tokenSecret)

describe('Products Route', () => {
    let id: number
    beforeAll(async () => {
        await query(db, 'DELETE FROM products;')
        await query(db, 'DELETE FROM order_products;')
        const sql = 'INSERT INTO products (name, price, category)'
            + ' VALUES ($1, $2, $3);'
        await query(db, sql, ['prod1', 10, 'cate1'])
        await query(db, sql, ['prod2', 20, 'cate1'])
        await query(db, sql, ['prod3', 30, 'cate1'])
        await query(db, sql, ['prod4', 40, 'cate2'])
        await query(db, sql, ['prod5', 50, 'cate2'])
        const sql2 = 'INSERT INTO order_products (order_id, product_id, quantity)'
            + ' VALUES ($1, $2, $3);'
        await query(db, sql2, [10, 10, 5])
        await query(db, sql2, [10, 20, 10])
        await query(db, sql2, [10, 30, 10])
        await query(db, sql2, [10, 40, 10])
        await query(db, sql2, [10, 50, 10])
        await query(db, sql2, [10, 60, 5])
        await query(db, sql2, [20, 60, 10])
    })
    it('POST /products', async () => {
        const res: Response = await request(app)
            .post('/products')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: 'prod6',
                price: 60,
                category: 'cate2'
            }).catch(err => {
                console.error(err)
            }).then()
        id = res.body.id
        expect(res.body.name).toEqual('prod6')
    })
    it('GET /products', async () => {
        const res: Response = await request(app)
            .get('/products')
            .catch(err => {
                console.error(err)
            }).then()
        expect(res.body.length).toEqual(6)
    })
    it('GET /products/:id', async () => {
        const res: Response = await request(app)
            .get('/products/' + id.toString())
            .catch(err => {
                console.error(err)
            }).then()
        expect(res.body.name).toEqual('prod6')
    })
    it('GET /products/:category', async () => {
        const res: Response = await request(app)
            .get('/products/category/cate1')
            .catch(err => {
                console.error(err)
            }).then()
        expect(res.body.length).toEqual(3)
    })
    it('GET /products/util/topfive', async () => {
        const res: Response = await request(app)
            .get('/products/util/topfive')
            .catch(err => {
                console.error(err)
            }).then()
        expect(res.body[0].product_id).toEqual(60)
    })
})