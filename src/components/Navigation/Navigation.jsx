import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const generateIsActiveClass = ({ isActive }) => {
  return clsx(css.menu, isActive && css.isActive);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <NavLink className={generateIsActiveClass} to="/">
          Home
        </NavLink>
        <NavLink className={generateIsActiveClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
