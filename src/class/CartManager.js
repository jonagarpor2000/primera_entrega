import fs from 'fs';
import {ProductManager} from './ProductManager.js'

const prodmg = new ProductManager('./src/models/products.json')
export class CartManager {
    #filename
    #format
    #error
    
    constructor(filename) {
        this.#filename = filename
        this.#format = 'utf-8'
        this.#error=undefined
    };

    //Obtiene productos desde JSON y los retorna en formato objeto
    getProducts = async()=> {
        
        return JSON.parse(await fs.promises.readFile(this.#filename,this.#format))
    }
    
    test = async() => {
        return await prodmg.getProducts()
    }

    getProductById = async(id) => {
        let contenido = await this.getProducts()
        const product = contenido.find(producto => producto.id == id)
        return product
    }
    

    #generateId = async () => {
     const products = await this.getProducts()
     return (products.length === 0) ? 1 : products[products.length-1].id + 1
    } 
    
    #existsproduct = async (id) => {
        return !(await this.getProductById(id)) ? true : false  
    }

    
    
    #validateProduct = async (title, description, code ,price,status,stock,category,thumbnail) => {
        if (!title || !description || !code || !price || !price|| !status|| !stock|| !category|| !thumbnail) {
            this.#error = `[${code}]: campos incompletos`
        } else {
            let contenido = await this.getProducts()
            const found = contenido.find(producto => producto.code === code)
            if (found){ this.#error = `[${code}]: el code ya existe`
            
        }else this.#error = undefined
        
        }
    }

    //Añade producto mediante array que le es pasado, sin embargo, no es capaz de agregar producto uno tras otro

    addProduct = async (id_prod) => {
       
        let prodarr = []
        await this.#validateProduct(title, description, code ,price,status,stock,category,thumbnail)
        if (await this.#existsproduct){
            let contenido = await this.getProducts()
            let id_prodarr = await this.#generateId()
           prodarr = [...contenido,{id: id_prodarr,title, description, code ,price,status,stock,category,thumbnail}]
            await fs.promises.writeFile(this.#filename, JSON.stringify(prodarr, null,'\t'))
        }else{
            prodarr = [{id: id_prodarr,title, description, code ,price,status,stock,category,thumbnail}]
            await fs.promises.writeFile(this.#filename, JSON.stringify(prodarr, null,'\t'))
        }

    }

    deleteProduct = async (id)=>{
        let contenido = await this.getProducts()
        let cont_nodelete = contenido.filter(producto => producto.id != id)
        console.log(cont_nodelete)
        await fs.promises.writeFile(this.#filename, JSON.stringify(cont_nodelete, null,'\t'))
    };

    updateProduct = async (id,title, description, code ,price,status,stock,category,thumbnail)=>{
        let contenido = await this.getProducts()
        let map_cont = contenido.map(producto => producto.id)
        let indx = Number(map_cont.indexOf(Number(id)))
        if(indx===-1){
            console.log('No existe tal producto');
        }else{
            let prod = {
                'id': id,
                'title': title,
                'description': description,
                'code': code,
                'price': price,
                'status': status,
                'stock': stock,
                'category':category,
                'thumbnail': thumbnail
            }
            contenido.splice(indx,1,prod)
            await fs.promises.writeFile(this.#filename, JSON.stringify(contenido, null,'\t'))
        }
        


    };

    

}


