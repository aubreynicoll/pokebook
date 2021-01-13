import React from "react";
import { Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import PokemonCard from "./PokemonCard";
import { FetchPokedexDetailView, FetchPokedexDetailViewVariables } from "./__generated__/FetchPokedexDetailView";
import LoadingScreen from "./LoadingScreen";
import PokemonFacts from "./PokemonFacts";

const FETCH_POKEDEX_DETAIL_VIEW = gql`
  query FetchPokedexDetailView($id: Int!) {
    pokemon(
      id: $id
    ) {
      id
      name
      types
      artwork
      height
      weight
      moves
    }
  }
`;

const PokemonDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    loading,
    data,
    error,
  } = useQuery<FetchPokedexDetailView, FetchPokedexDetailViewVariables>(FETCH_POKEDEX_DETAIL_VIEW, {
    variables: { id: Number(id) },
  });

  if (loading) return <LoadingScreen />;
  if (error || !data || !data.pokemon) return <div>ERROR</div>;

  return (
    <Box className="PokedexDetailView-root">
      <PokemonCard pokemon={data?.pokemon} />
      <PokemonFacts pokemon={data?.pokemon} />
    </Box>
  );
};

export default PokemonDetailView;
