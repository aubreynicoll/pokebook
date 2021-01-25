const { GraphQLScalarType, Kind } = require('graphql')

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime()
  },
  parseValue(value) {
    return new Date(value)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }
    return null
  },
})

const resolvers = {
  Date: dateScalar,
  Query: {
    allPokemon: (root, args, { dataSources }) => dataSources.pokemonAPI.getAllPokemon(),
    pokemon: (root, args, { dataSources }) => dataSources.pokemonAPI.getPokemonById(args.id),
  },
}

module.exports = resolvers
