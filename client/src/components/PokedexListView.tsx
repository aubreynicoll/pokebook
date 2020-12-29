import React from 'react';
import PokemonCard from './PokemonCard';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { FetchPokedexListView } from './__generated__/FetchPokedexListView';

const FETCH_POKEDEX_LIST_VIEW = gql`
  query FetchPokedexListView {
    allPokemon {
      id
      name
      artwork
    }
  }
`;

const PokedexView: React.FC = () => {
  const { loading, data: pokemonList, error } = useQuery<FetchPokedexListView>(FETCH_POKEDEX_LIST_VIEW);
  
  if (loading) return null;
  if (error || !pokemonList) return <div>ERROR</div>;
  return (
    <Grid container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={10}
    >

      {pokemonList.allPokemon.map(pokemon => (
        <Grid item className="PokedexListView-Grid-item"
          xs={4} 
          key={pokemon.id}          
        >
          <Link to={`/pokemon/${pokemon.id}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        </Grid>
      ))}
      
    </Grid>
  );
};

export default PokedexView;