import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router";
import { getMovieById } from "../../services/movieApi";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieInfo from "../../components/MovieInfo/MovieInfo";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      setError(null);
      setMovie(null);
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);
  return (
    <div>
      {movie && <MovieInfo {...movie} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage>Something was wrong</ErrorMessage>}
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Outlet />
    </div>
  );
}
