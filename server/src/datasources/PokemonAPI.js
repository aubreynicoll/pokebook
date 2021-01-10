const { RESTDataSource } = require('apollo-datasource-rest');

class PokemonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2';
  }

  static pokemonReducer(object) {
    return {
      id: object.id,
      name: object.name,
      types: object.types.map(({ type }) => type.name),
      artwork: object.sprites.other['official-artwork'].front_default,
      height: object.height,
      weight: object.weight,
      moves: object.moves.map(({ move }) => move.name),
    };
  }

  async getAllPokemon() {
    const params = {
      limit: 150,
    };
    const { results } = await this.get('/pokemon', params);

    const data = await Promise.all(results.map(({ url }) => this.get(url)));

    return data.map((object) => PokemonAPI.pokemonReducer(object));
  }

  async getPokemonById(id) {
    const data = await this.get(`/pokemon/${id}/`);

    return PokemonAPI.pokemonReducer(data);
  }
}

module.exports = PokemonAPI;
