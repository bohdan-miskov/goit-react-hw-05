export default function MovieCastItem({ name, character, profile_path }) {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${profile_path}`}
        alt={name}
        height={150}
      />
      <h4>{name}</h4>
      <p>{`Charachter:${character}`}</p>
    </>
  );
}
