import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import Postgrator from 'postgrator'
import { CreateProductInput, GetProductInput, ProductController } from './controllers/product.controller'
import { mongoose } from './infrastructure/mongo.client'
import { postgres } from './infrastructure/postgres.client'
import { ProductRepository as MongoProductRepository } from './repositories/mongo/product.repository'
import { ProductRepository as PostgresProductRepository } from './repositories/postgres/product.repository'
import { Product } from './models/product.model'

(async () => {
  const postgrator = new Postgrator({
    database: 'postgres',
    driver: 'pg',
    migrationPattern: `${__dirname}/database/migrations/*.sql`,
    schemaTable: 'migrations_version',
    execQuery: (query) => postgres.query(query),
  });

  // const repository = new MongoProductRepository(Product)
  const repository = new PostgresProductRepository(postgres)

  const productController = new ProductController(repository)
  const fastify = Fastify({
    logger: true
  })

  try {
    await mongoose.connect('mongodb://root:root@127.0.0.1:27017/journey_from_mongo_to_pg?authSource=admin')
    await postgres.connect()
    await postgrator.migrate()
  } catch (err) {
    throw err
  }
  
  fastify.post('/products', (request: CreateProductInput, reply: FastifyReply) => productController.createProduct(request, reply))
  fastify.get('/products/:productId', (request: GetProductInput, reply: FastifyReply) => productController.getProduct(request, reply))

  fastify.listen({ port: 3000 }, async (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  
    fastify.log.debug(`Server is now listening on ${address}`)
  })
})()
