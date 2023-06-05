import express from 'express'
import productRouter from './routers/product.router.js'
import cartRouter from './routers/cart.router.js'


const error = false

const app = express()
app.use(express.json())



app.get('/', (req, res) => res.send('Ok'))
app.get('/health', (req, res) => res.json({ message: 'The server is running on port 8080' }))



app.use('/api/products', productRouter)
app.use('/carts', cartRouter)

app.listen(8080, () => console.log('Server Up'))
