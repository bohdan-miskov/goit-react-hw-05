import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCastById } from "../../services/movieApi";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieCastItem from "../MovieCastItem/MovieCastItem";

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      setError(null);
      setCast([]);
      try {
        const data = await getMovieCastById(movieId);
        setCast(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <ul>
      {cast.length > 0 &&
        cast.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            <MovieCastItem
              name={name}
              character={character}
              profile_path={profile_path}
            />
          </li>
        ))}
      {isLoading && <Loader />}
      {error && <ErrorMessage>Something was wrong</ErrorMessage>}
    </ul>
  );
}
