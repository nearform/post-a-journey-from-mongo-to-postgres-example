import crypto from 'node:crypto'
import { Model } from 'mongoose'
import { Nullable } from '../../types/nullable.type'
import { Repository } from '../repository.interface'
import { Product } from '../../types/product.type'
import { WithNoId } from '../../types/with-no-id.type'

export class ProductRepository implements Repository<Product> {
  constructor(private readonly database: Model<Product>) {}

  async create(product: WithNoId<Product>): Promise<Product> {
    return (await this.database.create({ id: crypto.randomUUID(), name: product.name })).toObject()
  }

  async getById(id: string): Promise<Nullable<Product>> {
    return await this.database.findOne({ id })
  }
}
