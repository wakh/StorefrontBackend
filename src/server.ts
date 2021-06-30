import express, { Request, Response } from 'express'
import usersRoute from './routes/users'
import productsRoute from './routes/products'
import ordersRoute from './routes/orders'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Main')
})

app.use('/users', usersRoute)
app.use('/orders', ordersRoute)
app.use('/products', productsRoute)

app.listen(port, () => {
    console.log('Server started on port ' + port)
})

export default app