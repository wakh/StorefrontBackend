import { User, UserStore } from '../../models/users'
import db from '../../database'
import query from '../../utilities/query'

describe('Users Model', () => {
    const store = new UserStore()
    beforeAll(async () => {
        const sql = 'INSERT INTO users (id, password, firstName, lastName)'
        + 'VALUES ($1, $2, $3, $4);'
        await query(db, sql, ['test1', 'test123', 'Test1', 'Test1'])
        await query(db, sql, ['test2', 'test123', 'Test2', 'Test2'])
        await query(db, sql, ['test3', 'test123', 'Test3', 'Test3'])
    })
    it('index', async () => {
        const users: User[] = await store.index()
        expect(users.length).toEqual(3)
    })
    it('show', async () => {
        const user: User = await store.show('test1')
        expect(user.id).toEqual('test1')
    })
    it('create', async () => {
        const user: User = {
            id: 'test4',
            password: 'test123',
            firstName: 'Test4',
            lastName: 'Test4'
        }
        const newUser: User = await store.create(user)
        expect(newUser.id).toEqual(user.id)
    })
    it('delete', async () => {
        const user = await store.delete('test3')
        expect(user.id).toEqual('test3')
    })
})