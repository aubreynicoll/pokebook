import { Box } from '@material-ui/core';
import React from 'react';
import { Pokemon } from '../types';

interface Props {
  pokemon: Pick<Pokemon, 'id' | 'name' | 'artwork'>;
}

const PokedexTile: React.FC<Props> = ({ pokemon }) => {
  const displayId = pokemon.id.toString().padStart(3, '0');
  const displayName = pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1);

  return (
    <Box className="PokemonCard">
      <div>
        <img 
          className="PokemonCardImg" 
          src={pokemon.artwork}
        />
      </div>
      
      <div>
        #{displayId} {displayName}
      </div>
    </Box>
  );
};

export default PokedexTile;