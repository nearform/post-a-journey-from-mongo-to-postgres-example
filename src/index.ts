import Fastify from 'fastify'
import { ProductController } from './controllers/product.controller'
import { mongoose } from './infrastructure/mongo.client'
import { postgres } from './infrastructure/postgres.client'

(async () => {
  const productController = new ProductController()
  const fastify = Fastify({
    logger: true
  })

  try {
    await mongoose.connect('mongodb://root:root@127.0.0.1:27017/journey_from_mongo_to_pg?authSource=admin')
    await postgres.connect()
  } catch (err) {
    throw err
  }
  
  fastify.post('/products', productController.createProduct)
  fastify.get('/products/:productId', productController.getProduct)

  fastify.listen({ port: 3000 }, async (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  
    fastify.log.debug(`Server is now listening on ${address}`)
  })
})()
