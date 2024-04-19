# Fastify API CRUD

## Description

This is a simple API that uses Fastify to create a CRUD for a simple entity called "Catalog" and "Variant".
## Installation

Instructions for how to install your project. This might include:

1. Clone the repository
2. Copy the .env.example file to .env
3. Install the dependencies
```bash
npm install
```
4. Run the migrations
```bash
npx prisma migrate dev # to create the database and run the migrations
```

5. Generate the prisma client
```bash
npx prisma generate # to generate the prisma client
```
6. Build the project
```bash
npm run build
```
7. Start the project
```bash
npm start-build
```

## Installation with Docker
execute the following command to build the docker:

1. Build the image
```bash
docker build -t fastify-api-crud:v1 .
```
2. Run the image
```bash
docker run -p EXPOSED_PORT:PORT_APP fastify-api-crud:v1
```
3. Access the API on 
```bash
http://localhost:PORT_APP
```

## How to access API Documentation
Please access the following URL to access the swagger documentation:
```bash
http://localhost:PORT/docs
```

if you want to export it to a JSON file so you can import it to Postman or any other tool, you can do it by accessing:

```bash
http://localhost:PORT/openapi.json
```

## How to run tests

```bash
npm run test
```
