import { FiSearch } from "react-icons/fi";
import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMoviesByQuery } from "../../services/movieApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const QUERY_KEY = "query";

  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.currentTarget.elements.search.value.trim();

    if (!value) {
      toast.error("Sorry input is empty. You must write somthing!");
      return;
    }
    const params = new URLSearchParams({ [QUERY_KEY]: value });
    setSearchParams(params);
  };

  useEffect(() => {
    async function fetchMovies() {
      const query = searchParams.get(QUERY_KEY) ?? null;
      if (!query) return;
      setIsLoading(true);
      setError(null);
      setMovies([]);
      try {
        const data = await getMoviesByQuery(query);
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [searchParams]);

  return (
    <>
      <header className={css.header}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button className={css.button} type="submit">
            <FiSearch size="16px" />
          </button>

          <input
            className={css.input}
            placeholder="Search movies"
            name="search"
            required
            autoFocus
            autoComplete="off"
          />
        </form>
      </header>
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage>Something was wrong</ErrorMessage>}
    </>
  );
}
