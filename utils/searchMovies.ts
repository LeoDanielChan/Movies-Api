import axios from "axios";
import { API_KEY } from "./variables";

const SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const searchMovies = async (query) => {
  const URL_SEARCH = `${SEARCH_BASE_URL}?query=${encodeURIComponent(query)}&language=es-ES&page=1`;

  const response = await axios.get(URL_SEARCH, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
    params: {
      query: query,
      language: "es-ES",
      page: 1,
    },
  });

  return response
};
