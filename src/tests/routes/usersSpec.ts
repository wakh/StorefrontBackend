import request, { Response } from 'supertest'
import app from '../../server'
import jwt from 'jsonwebtoken'
import db from '../../database'
import query from '../../utilities/query'
import { User } from '../../models/users'
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

describe('Users Route', () => {
    beforeAll(async () => {
        await query(db, 'DELETE FROM users;')
        const sql = 'INSERT INTO users (id, password, firstName, lastName)'
            + ' VALUES ($1, $2, $3, $4);'
        await query(db, sql, ['test1', password, 'Test1', 'Test1'])
    })
    it('POST /users', async () => {
        const res: Response = await request(app)
            .post('/users')
            .send({
                id: 'test2',
                password: password,
                firstName: 'Test2',
                lastName: 'Test2'
            }).catch(err => {
                console.error(err)
            }).then()
        const decoded = jwt.verify(res.body, tokenSecret)
        expect((decoded as User).id).toEqual('test2')
    })
    it('GET /users', async () => {
        const res: Response = await request(app)
            .get('/users')
            .set('Authorization', 'Bearer ' + token)
            .catch(err => {
                console.error(err)
            }).then()
        expect(res.body[0].id).toEqual('test1')
        expect(res.body[1].id).toEqual('test2')
    })
    it('GET /users/:id', async () => {
        const res: Response = await request(app)
            .get('/users/test2')
            .set('Authorization', 'Bearer ' + token)
            .catch(err => {
                console.error(err)
            }).then()
        expect(res.body.id).toEqual('test2')
    })
})