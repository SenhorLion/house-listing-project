# House Listing/Sharing Project App

App to show and share house listings [think Airbnb] using Node, Express, GraphQL, MongoDB, JavaScript, TypeScript and React

## Usage

### Server

- `npm install` : to install all dependencies
- `npm run build` : run TypeScript build
- `npm run seed` : to seed the MongoDB Cloud Atlas instance
- `npm run seed:local` : to seed the local MongoDB instance

_NB: you can pass a number to seed:_ `npm run seed -- --SEED_NUMBER=20`

- `npm run start:local` : to run GraphQL server, using a local MongoDB
- `npm run start` : to run GraphQL server, using MongoDB Cloud Atlas instance

Open `http://localhost:9000/api` in a browser to interact with the running GraphQL server

**Server structure**

```bash
└── server
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── seed-data
    │   └── seed.ts
    ├── src
    │   ├── database
    │   │   └── index.ts
    │   ├── graphql
    │   │   ├── index.ts
    │   │   ├── resolvers
    │   │   │   ├── Listing
    │   │   │   │   └── index.ts
    │   │   │   └── index.ts
    │   │   └── typeDefs.ts
    │   ├── index.express.api.ts
    │   ├── index.ts
    │   ├── lib
    │   │   └── types.ts
    │   └── listings.ts
    └── tsconfig.json

```

### Client

- `npm install` : to install package dependencies
- `npm run build` : to run build
- `npm run codegen:schema` : to download the schema from the running GraphQL server
- `npm run codegen:generate` : to generate the TypeSCript types from GraphQL schema
- `npm run start` : to run client, opens in browser

Open `http://localhost:3000` in a browser to see the app running

**Client Structure**

```bash
├── client
│   ├── README.md
│   ├── __generated__
│   │   └── globalTypes.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── schema.json
│   ├── src
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── sections
│   │   │   ├── Listings
│   │   │   │   ├── Listings.tsx
│   │   │   │   ├── __generated__
│   │   │   │   │   ├── DeleteListing.ts
│   │   │   │   │   └── Listings.ts
│   │   │   │   ├── components
│   │   │   │   │   ├── ListingsSkeleton
│   │   │   │   │   │   ├── ListingsSkeleton.tsx
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── styles
│   │   │   │   │   │       └── ListingsSkeleton.css
│   │   │   │   │   └── index.ts
│   │   │   │   ├── index.tsx
│   │   │   │   ├── styles
│   │   │   │   │   └── Listings.css
│   │   │   │   └── types.ts
│   │   │   └── index.tsx
│   │   ├── serviceWorker.ts
│   │   ├── setupTests.ts
│   │   └── styles
│   │       └── index.css
│   └── tsconfig.json


```
