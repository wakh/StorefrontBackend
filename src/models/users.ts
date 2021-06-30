import db from '../database'
import query from '../utilities/query'
import bcrypt from 'bcrypt'

const pepper = process.env.BCRYPT_PASSWORD as string
const saltRounds = process.env.SALT_ROUNDS as string

export type User = {
    id: string
    password: string
    firstName: string
    lastName: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users;'
            return (await query(db, sql)).rows
        } catch(err) {
            throw new Error(`Could not index 'users' table. Error: ${err}`)
        }
    }
    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1);'
            return (await query(db, sql, [id])).rows[0]
        } catch(err) {
            throw new Error(`Could not show user '${id}'. Error: ${err}`)
        }
    }
    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (id, password, firstName, lastName)'
                + 'VALUES ($1, $2, $3, $4) RETURNING *;'
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            )
            await query(db, sql, [
                u.id, 
                hash, 
                u.firstName, 
                u.lastName
            ])
            return await this.show(u.id)
        } catch(err) {
            throw new Error(`Could not create user '${u.id}. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *;'
            return (await query(db, sql, [id])).rows[0]
        } catch(err) {
            throw new Error(`Could not delete user '${id}'. Error: ${err}`)
        }
    }
}