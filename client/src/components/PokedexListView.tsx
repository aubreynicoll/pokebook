import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import PokemonCard from "./PokemonCard";
import { FetchPokedexListView } from "./__generated__/FetchPokedexListView";
import LoadingScreen from "./LoadingScreen";

const FETCH_POKEDEX_LIST_VIEW = gql`
  query FetchPokedexListView {
    allPokemon {
      id
      name
      artwork
      types
    }
  }
`;

const PokedexView: React.FC = () => {
  const [filter, setFilter] = useState("");

  const {
    loading,
    data,
    error,
  } = useQuery<FetchPokedexListView>(FETCH_POKEDEX_LIST_VIEW);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <div>ERROR</div>;

  const pokemonList = !filter && data
    ? data.allPokemon
    : data.allPokemon.filter((pokemon) => (
      pokemon.id === parseInt(filter, 10)
    || pokemon.name.toLowerCase().includes(filter.toLowerCase())
    || pokemon.types.some((type) => type.toLowerCase().includes(filter.toLowerCase()))
    ));

  const displayPokemonList = () => {
    if (pokemonList.length === 0) {
      return <div>No search results</div>;
    }
    return (
      <Box className="PokedexListView-grid-container">
        {pokemonList.map((pokemon) => (
          <Box className="PokedexListView-grid-item">
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Box className="PokedexListView-searchbar">
        <TextField
          variant="outlined"
          label="Filter Pokémon by ID, Name, or Type"
          margin="normal"
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
          fullWidth
        />
      </Box>

      {displayPokemonList()}
    </Box>
  );
};

export default PokedexView;
