import { Product, ProductStore } from '../../models/products'
import db from '../../database'
import query from '../../utilities/query'

describe('Products Model', () => {
    const store = new ProductStore()
    beforeAll(async () => {
        const sql = 'INSERT INTO products (name, price, category)'
            + 'VALUES ($1, $2, $3);'
        await query(db, sql, ['item1', '10', 'category1'])
        await query(db, sql, ['item2', '20', 'category1'])
        await query(db, sql, ['item3', '30', 'category2'])
        await query(db, sql, ['item4', '40', 'category2'])
        await query(db, sql, ['item5', '50', 'category3'])
    })
    it('index', async () => {
        const products: Product[] = await store.index()
        expect(products.length).toEqual(5)
    })
    it('indexCategory', async () => {
        const products: Product[] = await store.indexCategory('category2')
        expect(products.length).toEqual(2)
    })
    it('show', async () => {
        const product: Product = await store.show('2')
        expect(product.name).toEqual('item2')
    })
    it('create', async () => {
        const product: Product = {
            name: 'item6',
            price: 60,
            category: 'category3'
        }
        const newProduct: Product = await store.create(product)
        expect(newProduct.name).toEqual('item6')
    })
    it('delete', async () => {
        const product: Product = await store.delete('5')
        expect(product.name).toEqual('item5')
    })
})