import React from "react";
import { Box, Grid } from "@material-ui/core";
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
  const {
    loading,
    data: pokemonList,
    error,
  } = useQuery<FetchPokedexListView>(FETCH_POKEDEX_LIST_VIEW);

  if (loading) return <LoadingScreen />;
  if (error || !pokemonList) return <div>ERROR</div>;
  return (
    <Box>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={10}
      >
        {pokemonList.allPokemon.map((pokemon) => (
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
