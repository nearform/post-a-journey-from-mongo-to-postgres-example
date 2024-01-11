# post-a-journey-from-mongo-to-postgres-example
A very simple API example using TypeScript, Fastify, Postgres, Mongo, Repository Pattern, and Dependency Injection for our technical blog post.

## Getting started
Follow the next instructions to run the api:

1. Install all dependencies: `npm ci`
2. Spawn the local infrastructure: `npm run infra:up`
3. Start the api: `npm start`

## Using API
You can send requests to the API using [HTTPie](https://httpie.io)

### Inserting a new product
```
http POST http://localhost:3000/products <<< '{ "name": "[PRODUCT_NAME]" }'     
```

### Getting a product
```
http GET http://localhost:3000/products/[PRODUCT_ID]
```

## Migrating from Mongo to Postgres manually
```
npm run db:migrate
```
