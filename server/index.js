const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
const PokemonAPI = require('./src/datasources/PokemonAPI')
const DatabaseAPI = require('./src/datasources/DatabaseAPI')

const pokemonAPI = new PokemonAPI()
const databaseAPI = new DatabaseAPI()

const dataSources = () => ({
  pokemonAPI,
  databaseAPI,
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})

const app = express()
app.use(cors())
app.use(express.static('build'))
server.applyMiddleware({ app, path: '/graphql' })

app.get('/health', (req, res) => {
  res.send('OK')
})

const PORT = process.env.PORT || 4000
app.listen(PORT)
