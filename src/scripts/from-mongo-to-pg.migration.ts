import crypto from 'node:crypto'
import SQL from '@nearform/sql'
import { mongoose } from '../infrastructure/mongo.client'
import { postgres } from '../infrastructure/postgres.client'
import { Product } from '../models/product.model'

(async () => {
  console.log('Starting database migration')
  try {
    console.log('Connecting to mongo')
    await mongoose.connect('mongodb://root:root@127.0.0.1:27017/journey_from_mongo_to_pg?authSource=admin')
    console.log('Connecting to postgres')
    await postgres.connect()

    console.log('Getting all products from mongo')
    const products = await Product.find({})

    for (const product of products) {
      console.log(`Inserting product ${product._id} into postgres`)
      const result = await postgres.query(SQL`INSERT INTO products (id, name) VALUES (${crypto.randomUUID()}, ${product.name}) RETURNING *`)

      if (result.rows.length > 0) {
        console.log(`Product ${result.rows[0].id} inserted successfully`)
      } else {
        console.log(`Product with id ${product._id} was not inserted into postgres`)
      }
    }

    console.log('Closing postgres connection')
    await postgres.end()
    console.log('Closing mongo connection')
    await mongoose.disconnect()

    console.log('Database migration finished successfully')
  } catch(err) {
    throw err
  }
})()
