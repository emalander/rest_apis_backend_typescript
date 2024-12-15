import { Router } from "express"
import {body, param} from 'express-validator'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                           schema:
 *                               type: array
 *                               items:
 *                                  $ref: '#/components/schemas/Product' 
 *                                                                                                
 *                  
 */

router.get('/',getProducts )

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product baesd on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Not Found
 *                   
 */

router.get('/:id', 
    // validacion
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductsById )

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the DB
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 3010
 *          responses:
 *              201:
 *               description: Success
 *               content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 *                            
 */

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 3010
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *      responses:
 *           200:
 *               description: Success
 *               content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *           400:
 *               description: Bad Request - invalid ID or invalid input data
 *           404:
 *               description: Product not found
 *      
 */
router.post('/',    
    
        // validacion
    body('name')
        .notEmpty().withMessage('el nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio')
        .custom(value=> value> 0).withMessage('El precio no es válido'),
    body('availability'),
    handleInputErrors,
    createProduct)

router.put('/:id', 
    
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('el nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio')
        .custom(value=> value> 0).withMessage('El precio no es válido'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct)
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *           200:
 *               description: Success
 *               content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *           400:
 *               description: Bad Request - invalid ID
 *           404:
 *               description: Product not found
 *      
 */
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product by ID
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *           200:
 *               description: Success
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *           400:
 *               description: Bad Request - invalid ID
 *           404:
 *               description: Product not found
 *      
 */
router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability )

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
) 

export default router