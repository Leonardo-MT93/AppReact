// import withoutResults from '../mocks/no-response.json'
const API_KEY = "2c5a8a05";
export const searchMovies = async ({ search }) => {
  if (search === " ") return null;

  try {
    if (search) {

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );
      const json = await response.json();
      const movies = json.Search;
      return movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }));
    }
  } catch (error) {
    throw new error("Error buscando peliculas");
  }
};
