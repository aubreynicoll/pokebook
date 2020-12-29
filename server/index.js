const { ApolloServer } = require('apollo-server')
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
const PokemonAPI = require('./src/datasources/PokemonAPI')

const pokemonAPI = new PokemonAPI()

const dataSources = () => ({
  pokemonAPI
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
})

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`)
})