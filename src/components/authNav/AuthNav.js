import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <>
      <div>
        <NavLink
          to="/register"
          className={navData => (navData.isActive ? s.activeLink : s.link)}
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/login"
          className={navData => (navData.isActive ? s.activeLink : s.link)}
        >
          Sign In
        </NavLink>
      </div>
    </>
  );
};
export default AuthNav;
