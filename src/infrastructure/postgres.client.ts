import { Client } from 'pg'

export const postgres = new Client({
  database: 'postgres',
  host: '127.0.0.1',
  password: 'root',
  port: 5432,
  user: 'postgres',
})
