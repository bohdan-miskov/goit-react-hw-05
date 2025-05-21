import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieReviewsById } from "../../services/movieApi";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieReviewsItem from "../MovieReviewsItem/MovieReviewsItem";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      setError(null);
      setReviews([]);
      try {
        const data = await getMovieReviewsById(movieId);
        console.log("🚀 ~ fetchMovie ~ data:", data);
        setReviews(data);
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
      {reviews.length > 0 &&
        reviews.map(({ id, author, content }) => (
          <li key={id}>
            <MovieReviewsItem author={author} content={content} />
          </li>
        ))}
      {isLoading && <Loader />}
      {error && <ErrorMessage>Something was wrong</ErrorMessage>}
    </div>
  );
}
