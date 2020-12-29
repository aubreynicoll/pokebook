const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
const PokemonAPI = require('./src/datasources/PokemonAPI')
const express = require('express')
const cors = require('cors')


const pokemonAPI = new PokemonAPI()

const dataSources = () => ({
  pokemonAPI
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
})

const app = express()
app.use(cors())
app.use(express.static('build'))
server.applyMiddleware({ app })

app.get('/health', (req, res) => {
  res.send('OK')
})

const port = process.env.PORT || 4000
app.listen({ port }, () => {
  console.log(`Server listening at ${port}`)
})