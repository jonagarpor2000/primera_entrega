import express from 'express'
import productRouter from './routers/product.router.js'
//import cartRouter from './routers/cart.router.js'


const error = false

const app = express()
app.use(express.json())


//endpoints
// http://localhost:8080/
app.get('/', (req, res) => res.send('Ok'))
app.get('/health', (req, res) => res.json({ message: 'The server is running on port 8080' }))



/*const middleware2 = (req, res, next) => {
    console.log('Soy un middlewar 2 !')
    if (error) return res.status(400).json({ error: 'HUbo un erroro!'})
    next()
}*/

app.use('/api/products', productRouter)
//app.use('/carts', cartRouter)

app.listen(8080, () => console.log('Server Up'))
