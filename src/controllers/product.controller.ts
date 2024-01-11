import { FastifyReply, FastifyRequest } from 'fastify'
import { Repository } from '../repositories/repository.interface'
import { Product } from '../types/product.type'

export type CreateProductInput = FastifyRequest<{ Body: { name: string } }>
export type GetProductInput = FastifyRequest<{ Params: { productId: string }}>

export class ProductController {
  constructor(private readonly repository: Repository<Product>) {}

  async createProduct(request: CreateProductInput, reply: FastifyReply) {
    try {
      const product = request.body

      if (product?.name?.trim()?.length > 0) {
        return reply.send({ data: await this.repository.create(product) })
      }

      return reply.code(400).send({ message: 'Name is required to create a new product' })
    } catch (err) {
      throw err
    }
  }

  async getProduct(request: GetProductInput, reply: FastifyReply) {
    try {
      const productId = request.params.productId
      const product = await this.repository.getById(productId)
  
      if (!product) {
        return reply.code(404).send({ message: `No product found for id ${productId}` })
      }
  
      return reply.send({ data: product })
    } catch (err) {
      throw err
    }
  }
}
