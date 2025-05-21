import { useEffect, useState } from "react";
import { getTrendingToday } from "../../services/movieApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      setError(null);
      setMovies([]);
      try {
        const data = await getTrendingToday();
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, []);

  return (
    <>
      <h1>Trending todays</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage>Something was wrong</ErrorMessage>}
    </>
  );
}
