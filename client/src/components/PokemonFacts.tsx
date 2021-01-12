import { Box, Paper } from "@material-ui/core";
import React from "react";
import { Pokemon } from "../types";

interface Props {
  pokemon: Omit<Pokemon, "artwork">;
}

const PokemonFacts: React.FC<Props> = ({ pokemon }) => (
  <Box className="PokemonFacts-root h-full" mx="auto">
    <Paper className="h-full" elevation={4}>
      <Box p={2}>
        <ul>
          <li>
            <strong>ID:</strong>
            {" "}
            {pokemon.id}
          </li>
          <li>
            <strong>Name:</strong>
            {" "}
            {pokemon.name}
          </li>
          <li>
            <strong>Types:</strong>
            {" "}
            {pokemon.types.join(", ")}
          </li>
          <li>
            <strong>Height:</strong>
            {" "}
            {pokemon.height}
          </li>
          <li>
            <strong>Weight:</strong>
            {" "}
            {pokemon.weight}
          </li>
          <li>
            <strong>Moves:</strong>
            {" "}
            {pokemon.moves.join(", ")}
          </li>
        </ul>
      </Box>
    </Paper>
  </Box>
);

export default PokemonFacts;
