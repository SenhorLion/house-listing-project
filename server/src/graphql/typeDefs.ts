import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: String!
    address: String!
    country: String!
    admin: String!
    city: String!
    bookings: [ID]
    price: Int!
  }
  type User {
    id: ID!
    token: String!
    name: String!
    avatar: String!
    contact: String!
    walletId: String
    income: Int
    bookings: [ID]
    listings: [ID]
  }

  type Query {
    listings: [Listing!]!
    users: [User!]!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
  }
`;
