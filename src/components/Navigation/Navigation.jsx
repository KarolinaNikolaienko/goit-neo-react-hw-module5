import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const generateIsActiveClass = ({ isActive }) => {
  return clsx(css.menu, isActive && css.isActive);
};

const Navigation = () => {
  return (
    <header>
      <div className={css.navigationBar}>
        <nav className={css.navigation}>
          <NavLink className={generateIsActiveClass} to="/">
            Home
          </NavLink>
          <NavLink className={generateIsActiveClass} to="/movies">
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
