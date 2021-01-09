import { Paper, Box, Typography } from '@material-ui/core';
import React from 'react';
import { Pokemon } from '../types';

interface Props {
  pokemon: Pick<Pokemon, 'id' | 'name' | 'artwork' | 'types'>;
}

const PokedexTile: React.FC<Props> = ({ pokemon }) => {
  const displayId = '#' + pokemon.id.toString().padStart(3, '0');
  const displayName = pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1);

  return (
    <Box className="PokemonCard-root" mx="auto">
      <Paper elevation={4}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Box>
            <img className="PokemonCard-img" src={pokemon.artwork} />
          </Box>
          <Box>
            <Typography variant="body1">
              {displayId} {displayName}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PokedexTile;