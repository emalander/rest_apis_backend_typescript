import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {

    it('Should display validation errors',  async ()=> {

        const response = await request(server).post('/api/products').send({})  // Send empty to fail
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })

    it('Should validate that the price is greater than 0',  async ()=> {

        const response = await request(server).post('/api/products').send({
            name:"product for test",
            price:0

        }) 
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })

    it('Should validate that the price is a number and greater than 0',  async ()=> {

        const response = await request(server).post('/api/products').send({
            name:"product for test",
            price:0

        }) 
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })

    it('Should create a new product', async ()=> {
        const response = await request(server).post('/api/products').send({
            name: "Producto - test",
            price: 12
        })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('GET /api/products', () => {

    it('Should check if api/products url exists',async() => {
      const response = await request(server).get('/api/products')
      expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with products', async()=> {

      const response = await request(server).get('/api/products')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(response.body).toHaveProperty('data') 
      expect(response.body.data).toHaveLength(1)
      expect(response.body).not.toHaveProperty('errors')  
    })
})

describe('GET /api/products/:id', () => {

    it('Should return a null data for a non-existent product', async () => {
      const productId = 2000
      const response = await request(server).get(`/api/products/${productId}`)
      expect(response.body.data).toBe(null)
    })
})

describe('PUT /api/products/:id', ()=> {

    it('Should display validation error messages when updating a product', async() => {
      const response = await request(server).put('/api/products/1').send({})  // Send empty to fail
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors).toBeTruthy()
      expect(response.body.errors).toHaveLength(5)
      expect(response.status).not.toBe(200)  
    })

    it('Should validate that  the price is greater than 0', async() => {

      const response = await request(server)
        .put('/api/products/1')
        .send({

          "name":"Monitor nuevo",
          "price":0,
          "availability":true
        })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors).toBeTruthy()
      expect(response.body.errors).toHaveLength(1)
      expect(response.status).not.toBe(200)  
    })

})

describe('PATCH /api/products/:id', () => {
  it('Should return a null data for a non-existent product', async() => {
    const productId = 2000
    const response = await request(server).patch(`/api/products/${productId}`)
    expect(response.body.data).toBe(null) 
  })

  it('Should update the product availability', async () => {
    const response = await request(server).patch('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})

describe('DELETE /api/products/:id', ()=> {

  it('Should check a valid ID', async() => {

    const response = await request(server).delete('/api/products/not-valid')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0].msg).toBe('ID no válido')
    console.log(response.body.data, "linea 117")
  })

  it('Should delete a product', async() => {

    const response = await request(server).delete('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("Producto eliminado")
  }, 10000)

})
