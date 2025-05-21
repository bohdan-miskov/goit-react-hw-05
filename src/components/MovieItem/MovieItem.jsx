import { Link } from "react-router-dom";

export default function MovieItem({ id, title }) {
  return <Link to={`/movies/${id}`}>{title}</Link>;
}
