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

describe('Orders Route', () => {
    beforeAll(async () => {
        await query(db, 'DELETE FROM orders;')
        const sql = 'INSERT INTO orders (id, user_id, status)'
            + ' VALUES ($1, $2, $3);'
        await query(db, sql, [3, 10, 'FALSE'])
        await query(db, sql, [2, 10, 'TRUE'])
        await query(db, sql, [1, 10, 'TRUE'])
    })
    it('GET /orders/current/:uid', async () => {
        const res: Response = await request(app)
            .get('/orders/current/10')
            .set('Authorization', 'Bearer ' + token)
            .catch(err => {
                console.error(err)
            }).then()
        expect(res.body.oInfo.id).toEqual(3)
    })
    it('GET /orders/completed/:uid', async () => {
        const res: Response = await request(app)
            .get('/orders/completed/10')
            .set('Authorization', 'Bearer ' + token)
            .catch(err => {
                console.error(err)
            }).then()
        expect(res.body.length).toEqual(2)
    })
})