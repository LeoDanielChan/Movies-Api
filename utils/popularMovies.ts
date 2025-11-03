import axios from "axios";
import { API_KEY, URL_POPULAR_MOVIES } from "./variables";

export const fetchPopularMovies = async () => {
  const response = await axios.get(URL_POPULAR_MOVIES, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
    params: { language: "es-ES", page: 1 },
  });
  return response;
};
