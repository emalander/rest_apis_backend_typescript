import { Request, Response} from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req, resp)=> {
  try {
    
    const products = await Product.findAll({ // para ordenar con id descendente, si hace falta...
      order: [
        ['id', 'DESC']
      ]
    })
    resp.json({data:products})

  } catch (error) {
      console.log(error)
  }
} 

export const getProductsById = async (req, resp)=> {
  try {
    console.log(req.params.id)
    const {id} = req.params
    const product = await Product.findByPk(id)
    resp.json({data:product})
    if(!product) {
      return resp.status(404).json
    }

  } catch (error) {
      console.log(error)
  }
}

export const createProduct = async (req, resp)=> {

  try {
    const product = await Product.create(req.body)
    resp.status(201).json({data:product})

  } catch (error) {
    //console.log(error)
  }
}

export const updateProduct = async (req, resp) => {

  const {id} = req.params
  const product = await Product.findByPk(id)
  resp.json({data:product})
  if(!product) {
    return resp.status(404).json
  }
  
  //Actualizar
  console.log(req.body)

  await product.update(req.body)
  await product.save() 
}

export const updateAvailability = async (req, resp) => {

  const {id} = req.params
  const product = await Product.findByPk(id)
  resp.json({data:product})
  if(!product) {
    return resp.status(404).json
  }
  
  //Actualizar
  product.availability = !product.dataValues.availability//req.body.availability
  await product.save() 
  //console.log(product.dataValues)

}

export const deleteProduct = async (req, resp) => {

  const {id} = req.params
  const product = await Product.findByPk(id)

  if(!product) {
    return resp.status(404).json
  }

  await product.destroy()
  resp.json({data:'Producto eliminado'})

}