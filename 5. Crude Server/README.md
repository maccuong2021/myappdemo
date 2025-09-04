## Project Structure 
Resource API /
│
├── src/                          # Source code folder
│   ├── controllers/              # Controllers handle request logic
│   │   └── resourceController.ts
│   │
│   ├── entity/                   # Database entity models
│   │   └── Resource.ts
│   │
│   ├── routes/                   # API routes & related config
│   │   └── resource.ts           # Routes for Resource CRUD
│   │
│   ├── data-source.ts            # Database connection configuration
│   ├── index.ts                  # Main router entry point
│   ├── swagger.ts                # Swagger documentation setup
│   └── index.ts                  # Express server entry point
│
├── .env                          # Environment variables
├── package.json                  # Project dependencies & scripts
└── tsconfig.json                 # TypeScript configuration
│
├── src/                          # Source code folder
│   ├── controllers/              # Controllers handle request logic
│   │   └── resourceController.ts
│   │
│   ├── entity/                   # Database entity models
│   │   └── Resource.ts
│   │
│   ├── routes/                   # API routes & related config
│   │   └── resource.ts           # Routes for Resource CRUD
│   │
│   ├── data-source.ts            # Database connection configuration
│   ├── index.ts                  # Main router entry point
│   ├── swagger.ts                # Swagger documentation setup
│   └── index.ts                  # Express server entry point
│
├── .env                          # Environment variables
├── package.json                  # Project dependencies & scripts
└── tsconfig.json                 # TypeScript configuration


## Quick Start

1. Install dependencies
```bash
npm install
```

2. Copy env
```bash
cp .env.example .env
```

3. Run in development
```bash
npm run build
npm run dev
```

When connected, the server starts at `http://localhost:3000`.

Swagger docs available at http://localhost:3000/api-docs

## Endpoints
- `POST /resources` – create `{ name, type }`
- `GET /resources` – list (filters: `?type=...&name=...`)
- `GET /resources/:id` – get details
- `PUT /resources/:id` – update any of `{ name, type }`
- `DELETE /resources/:id` – delete

## Notes for SQL Server
- Ensure TCP/IP is enabled and listening on port **1433**.
- If using a local developer instance, you can set `DB_ENCRYPT=false` and `DB_TRUST_SERVER_CERTIFICATE=true` in `.env`.
- The app uses `synchronize: true` (auto create tables) for development. Turn it off and use migrations for production.

- Install SQL Server on Docker 
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=123456789@Abc" `
 -p 1433:1433 --name sql2022 -d mcr.microsoft.com/mssql/server:2022-latest
 
 docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=123456789@Abc" `
 -p 1433:1433 --name sql2022 -v sqlvolume:/var/opt/mssql `
 -d mcr.microsoft.com/mssql/server:2022-latest
 
 docker exec -it sql2022 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 123456789@Abc

 Create New DB named: MyTest5

## Production build
```bash
npm run build
npm start
```

## Tech Stack
- Express 4
- TypeScript 5
- TypeORM 0.3.x with `mssql` driver

## Test with PostMain
- Get all resources
curl -X 'GET' \
  'http://localhost:3000/resources' \
  -H 'accept: application/json'

- Create new resource
curl -X 'POST' \
  'http://localhost:3000/resources' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Open",
  "type": "Menu Open"
}'

- Get resource by id
curl -X 'GET' \
  'http://localhost:3000/resources/3' \
  -H 'accept: application/json'

- Update resource by id
curl -X 'PUT' \
  'http://localhost:3000/resources/3' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "type": "string"
}'

- Delete resource by id
curl -X 'DELETE' \
  'http://localhost:3000/resources/3' \
  -H 'accept: */*'

