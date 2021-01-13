import React, { useState } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
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

  return (
    <Box>
      <TextField
        className="PokedexListView-search"
        variant="outlined"
        label="Filter Pokémon by ID, Name, or Type"
        margin="normal"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
        fullWidth
      />

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={10}
      >
        {pokemonList.map((pokemon) => (
          <Grid
            item
            className="PokedexListView-Grid-item"
            xs={12}
            md={6}
            lg={4}
            key={pokemon.id}
          >
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PokedexView;
