import MovieItem from "../MovieItem/MovieItem";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title }) => (
        <li key={id}>{<MovieItem id={id} title={title} />}</li>
      ))}
    </ul>
  );
}
