import axiosClient from "./axiosClient";

export interface Genre {
  id: number;
  name: string;
}

export interface OmdbRating {
  Source: string;
  Value: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;

  vote_average_tmdb?: number; // Рейтинг TMDB
  ratings_omdb?: OmdbRating[]; // Рейтинги из OMDB

  runtime?: number;
  tagline?: string;
  genres?: Genre[];
  awards?: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export const moviesApi = {
  async search(query: string) {
    const response = await axiosClient.get<Movie[]>("/movies/search", {
      params: { query },
    });
    return response.data;
  },

  async getById(id: number | string) {
    const response = await axiosClient.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  async getTrailers(id: number | string) {
    const response = await axiosClient.get<Video[]>(`/movies/${id}/trailers`);
    return response.data;
  },
};
