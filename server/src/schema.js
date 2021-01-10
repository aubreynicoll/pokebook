const { gql } = require('apollo-server');

const typeDefs = gql`
  type Pokemon {
    id: Int!
    name: String!
    types: [String!]!
    artwork: String!
    height: Int!
    weight: Int!
    moves: [String!]!
  }

  type Query {
    allPokemon: [Pokemon!]!
    pokemon(
      id: Int!
    ): Pokemon
  }
`;

module.exports = typeDefs;
