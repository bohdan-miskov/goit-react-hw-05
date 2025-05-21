export default function MovieInfo({
  title,
  overview,
  genres,
  poster_path,
  vote_average,
}) {
  return (
    <div>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          height={300}
        />
        <div>
          <h2>{title}</h2>
          <p>{`Score:${(vote_average * 10).toFixed(0)}%`}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(({ name }) => name).join(" ")}</p>
        </div>
      </div>
      <p>Additional information</p>
    </div>
  );
}
