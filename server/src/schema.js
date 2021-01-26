const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date
  
  type Pokemon {
    id: Int!
    name: String!
    types: [String!]!
    artwork: String!
    height: Int!
    weight: Int!
    moves: [String!]!
  }

  type User {
    id: ID!
    username: String!
    dateCreated: Date!
  }

  type Query {
    allPokemon: [Pokemon!]!

    pokemon(
      id: Int!
    ): Pokemon

    allUsers: [User!]!

    user(
      id: ID!
    ): User
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      ): User
  }
`

module.exports = typeDefs
