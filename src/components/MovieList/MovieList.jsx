import MovieItem from "../MovieItem/MovieItem";

export default function MovieList({ movies }) {
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>{<MovieItem id={id} title={title} />}</li>
      ))}
    </ul>
  );
}
