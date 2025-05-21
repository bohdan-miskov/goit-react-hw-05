import { NavLink } from "react-router";
import css from "./Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  return (
    <ul className={css.navList}>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? clsx(css.active, css.navLink) : css.navLink
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? clsx(css.active, css.navLink) : css.navLink
          }
          to="/movies"
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
}
