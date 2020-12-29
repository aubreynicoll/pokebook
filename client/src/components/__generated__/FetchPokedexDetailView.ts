/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchPokedexDetailView
// ====================================================

export interface FetchPokedexDetailView_pokemon {
  __typename: "Pokemon";
  id: number;
  name: string;
  types: string[];
  artwork: string;
  height: number;
  weight: number;
  moves: string[];
}

export interface FetchPokedexDetailView {
  pokemon: FetchPokedexDetailView_pokemon | null;
}

export interface FetchPokedexDetailViewVariables {
  id: number;
}
