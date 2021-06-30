import db from '../database'
import query from '../utilities/query'

export type Product = {
    id?: number
    name: string
    price: number
    category: string
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products;'
            return (await query(db, sql)).rows
        } catch(err) {
            throw new Error(`Could not index 'products' table. Error: ${err}`)
        }
    }
    async indexCategory(category: string): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1);'
            return (await query(db, sql, [category])).rows
        } catch(err) {
            throw new Error(`Could not show product with category '${category}'. Error: ${err}`)
        }
    }
    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1);'
            return (await query(db, sql, [id])).rows[0]
        } catch(err) {
            throw new Error(`Could not show product with id '${id}'. Error: ${err}`)
        }
    }
    async create(pd: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category)'
                + ' VALUES ($1, $2, $3) RETURNING *;'
            return (await query(db, sql, [pd.name, pd.price, pd.category])).rows[0]
        } catch(err) {
            throw new Error(`Could not create new product '${pd.name}'. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=$1 RETURNING *;'
            return (await query(db, sql, [id])).rows[0]
        } catch (err) {
            throw new Error(`Could not delete product id '${id}'. Error: ${err}`)
        }
    }
}