import { mongoose } from '../../infrastructure/mongo.client'
import { Nullable } from '../nullable.type'
import { Repository } from '../repository.interface'

type Product = {
  _id: string
  name: string
}

export const Product = mongoose.model('Product', new mongoose.Schema({
  name: String
}, { versionKey: false }))

export class ProductRepository implements Repository<Product> {
  async create(product: { name: string }): Promise<Product> {
    return (await Product.create(product)).toObject()
  }

  async getById(id: string): Promise<Nullable<Product>> {
    return await Product.findById(id)
  }
}