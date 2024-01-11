import { FastifyReply, FastifyRequest } from "fastify"
import { ProductRepository as MongoProductRepository } from "../repositories/mongo/product.repository"
import { ProductRepository as PostgresProductRepository } from "../repositories/postgres/product.repository"

const productMongoRepository = new MongoProductRepository()
const productPostgresRepository = new PostgresProductRepository()

export class ProductController {
  async createProduct(request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) {
    try {
      const product = request.body

      if (product?.name?.trim()?.length > 0) {
        return reply.send({ data: await productPostgresRepository.create(product) })
        // return reply.send({ data: await productMongoRepository.create(product) })
      }

      return reply.code(400).send({ message: 'Name is required to create a new product' })
    } catch (err) {
      throw err
    }
  }

  async getProduct(request: FastifyRequest<{ Params: { productId: string }}>, reply: FastifyReply) {
    try {
      const productId = request.params.productId
      const product = await productPostgresRepository.getById(productId)
      // const product = await productMongoRepository.getById(productId)
  
      if (!product) {
        return reply.code(404).send({ message: `No product found for id ${productId}` })
      }
  
      return reply.send({ data: product })
    } catch (err) {
      throw err
    }
  }
}
