import axios from 'axios';

import { Pokemon } from '../types';

const baseUrl = 'https://pokeapi.co/api/v2';

interface NamedAPIResourceList {
  count: number;
  next: string;
  previous: boolean;
  results: NamedAPIResource[];
}

interface NamedAPIResource {
  name: string;
  url: string;
}

const getAll = async (): Promise<Pokemon[]> => {
  const params = {
    params: {
      limit: 150
    }
  };

  const { data: { results } } = await axios
    .get<NamedAPIResourceList>(`${baseUrl}/pokemon`, params);

  const urls = results.map(({ url }) => url.slice(0, url.length - 1));

  const response = await axios.all(urls.map(url => axios.get<Pokemon>(url)));

  const pokemon = response.map(({ data }) => data);

  return pokemon;
};

export default {
  getAll
};