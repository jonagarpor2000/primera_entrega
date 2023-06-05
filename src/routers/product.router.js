import { Router } from 'express'
import {ProductManager} from '../class/ProductManager.js'

const router = Router()
const prodmg = new ProductManager('./src/models/products.json')



//endpoint para leer todos los productos
// http://localhost:8080/api/products
router.get('/', (req, res) => {
    const limit = req.query.limit
    prodmg.getProducts().then(prods =>{
        if (!limit) {
            res.status(200).json(prods)
        } else {
            let prod_limit = prods.splice(0,limit)
            res.status(200).send(prod_limit) 
        }
    })

    
})

//endpoint para leer un solo producto a partir de su ID
router.get('/:pid', (req, res) => {
    const id = req.params.pid
    prodmg.getProductById(id).then(prod =>{
        if (!prod) return res.status(404).json({ message: 'This product does not exists'})
        res.json(prod)
    }) 
    
})

//endpoint para crear a un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code ,price,status,stock,category,thumbnail } = req.body

    prodmg.addProduct(title, description, code ,price,status,stock,category,thumbnail).then(prod =>{
        res.json({ message: `Se agregp el producto ${title} exitosamente` })
    })
    
})

//endpoint para actualizar los datos de un producto
router.put('/:pid', (req, res) => {
    const id = req.params.pid
    const {title, description, code ,price,status,stock,category,thumbnail} = req.body
    
    prodmg.updateProduct(id,title, description, code ,price,status,stock,category,thumbnail).then(prod =>{
        res.json({ message: `Actualización exitosa de producto con id = ${id}` })
    })
    
})

//endpoint para eliminar un producto
router.delete('/:pid', (req, res) => {
    const id = req.params.pid
    prodmg.deleteProduct(id).then(prod =>{
        res.json({ message: `Producto con id = ${id} eliminado` })
    })
    
})

export default router