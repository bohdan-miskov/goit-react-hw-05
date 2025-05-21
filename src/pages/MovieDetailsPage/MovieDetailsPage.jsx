import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { getMovieById } from "../../services/movieApi";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import { IoMdArrowBack } from "react-icons/io";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const backPath = useLocation().state?.pathname;
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
    <div className={css.container}>
      <Link className={css.backLink} to={backPath ?? "/movies"}>
        <IoMdArrowBack size="20px" />
        Go back
      </Link>
      {movie && <MovieInfo {...movie} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage>Something was wrong</ErrorMessage>}
      <p>Additional information</p>
      <ul className={css.links}>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? clsx(css.active, css.link) : css.link
            }
            to="cast"
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? clsx(css.active, css.link) : css.link
            }
            to="reviews"
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
