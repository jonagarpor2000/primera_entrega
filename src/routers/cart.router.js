import { Router } from 'express'
import {CartManager} from '../class/CartManager.js'

const router = Router()
const cartmg = new CartManager('./src/models/CartManager.js')



//endpoint para leer todos los productos del carrito
// http://localhost:8080/api/products
router.get('/', (req, res) => {
    res.status(200).send(cartmg.test().then(result => {
        console.log(result)
    }))
    
})

//endpoint para leer un solo producto a partir de su ID
router.get('/:cid', (req, res) => {
    const id = req.params.cid
    cartmg.getProductById(id).then(prod =>{
        if (!prod) return res.status(404).json({ message: 'This product does not exists'})
        res.json(prod)
    }) 
    
})

//endpoint para crear a un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code ,price,status,stock,category,thumbnail } = req.body

    cartmg.addProduct(title, description, code ,price,status,stock,category,thumbnail).then(prod =>{
        res.json({ message: `Se agrego el producto ${title} exitosamente` })
    })
    
})

//endpoint para actualizar los datos de un producto
router.put('/:cid', (req, res) => {
    const id = req.params.cid
    const {title, description, code ,price,status,stock,category,thumbnail} = req.body
    
    cartmg.updateProduct(id,title, description, code ,price,status,stock,category,thumbnail).then(prod =>{
        res.json({ message: `Actualización exitosa de producto con id = ${id}` })
    })
    
})

//endpoint para eliminar un producto
router.delete('/:pid', (req, res) => {
    const id = req.params.pid
    cartmg.deleteProduct(id).then(prod =>{
        res.json({ message: `Producto con id = ${id} eliminado` })
    })
    
})

export default router