import crypto from 'node:crypto'
import SQL from '@nearform/sql'
import { Nullable } from '../../types/nullable.type'
import { Repository } from '../repository.interface'
import { Client } from 'pg'
import { Product } from '../../types/product.type'

export class ProductRepository implements Repository<Product> {
  constructor(private readonly database: Client) {}

  async create(product: { name: string }): Promise<Product> {
    const result = await this.database.query(SQL`INSERT INTO products (id, name) VALUES (${crypto.randomUUID()}, ${product.name}) RETURNING *`)
    
    return {
      id: result.rows[0].id,
      name: result.rows[0].name
    }
  }

  async getById(id: string): Promise<Nullable<Product>> {
    const result = await this.database.query(SQL`SELECT p.* FROM products p WHERE p.id=${id}`)

    if (result.rows.length > 0) {
      return {
        id: result.rows[0].id,
        name: result.rows[0].name
      }
    }

    return null
  }
}