import { Link, useLocation } from "react-router-dom";
import css from "./MovieItem.module.css";

export default function MovieItem({ id, title }) {
  const location = useLocation();
  return (
    <Link className={css.link} to={`/movies/${id}`} state={location}>
      {title}
    </Link>
  );
}
