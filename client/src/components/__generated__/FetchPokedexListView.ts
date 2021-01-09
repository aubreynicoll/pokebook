/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchPokedexListView
// ====================================================

export interface FetchPokedexListView_allPokemon {
  __typename: "Pokemon";
  id: number;
  name: string;
  artwork: string;
  types: string[];
}

export interface FetchPokedexListView {
  allPokemon: FetchPokedexListView_allPokemon[];
}
