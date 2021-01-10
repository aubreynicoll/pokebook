const resolvers = {
  Query: {
    allPokemon: (root, args, { dataSources }) => dataSources.pokemonAPI.getAllPokemon(),
    pokemon: (root, args, { dataSources }) => dataSources.pokemonAPI.getPokemonById(args.id),
  },
};

module.exports = resolvers;
