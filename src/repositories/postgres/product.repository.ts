import crypto from 'node:crypto'
import SQL from '@nearform/sql'
import { postgres } from '../../infrastructure/postgres.client'
import { Nullable } from '../nullable.type'
import { Repository } from '../repository.interface'

type Product = {
  id: string
  name: string
}



export class ProductRepository implements Repository<Product> {
  constructor() {
    (async () => {
      postgres.query(SQL`
        CREATE TABLE IF NOT EXISTS products (
          id UUID PRIMARY KEY NOT NULL,
          name VARCHAR(120) NOT NULL
        )
      `)
    })()
  }

  async create(product: { name: string }): Promise<Product> {
    const result = await postgres.query(SQL`INSERT INTO products (id, name) VALUES (${crypto.randomUUID()}, ${product.name}) RETURNING *`)
    
    return {
      id: result.rows[0].id,
      name: result.rows[0].name
    }
  }

  async getById(id: string): Promise<Nullable<Product>> {
    const result = await postgres.query(SQL`SELECT p.* FROM products p WHERE p.id=${id}`)

    if (result.rows.length > 0) {
      return {
        id: result.rows[0].id,
        name: result.rows[0].name
      }
    }

    return null
  }
}