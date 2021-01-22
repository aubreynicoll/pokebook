const { RESTDataSource } = require('apollo-datasource-rest')

class PokemonAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://pokeapi.co/api/v2'
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
    }
  }

  async getAllPokemon() {
    const maxId = 150

    const idArray = []

    for (let i = 1; i <= maxId; i += 1) {
      idArray.push(i)
    }

    return Promise.all(idArray.map((id) => this.getPokemonById(id)))
  }

  async getPokemonById(id) {
    const data = await this.get(`/pokemon/${id}/`)

    return PokemonAPI.pokemonReducer(data)
  }
}

module.exports = PokemonAPI
