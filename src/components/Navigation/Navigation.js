import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import s from './Navigation.module.css';
import { authSelectors } from 'redux/auth';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <>
      <nav>
        <NavLink
          to="/"
          className={navData => (navData.isActive ? s.activeLink : s.link)}
        >
          Home page
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/contacts"
            className={navData => (navData.isActive ? s.activeLink : s.link)}
          >
            Contacts
          </NavLink>
        )}
      </nav>
    </>
  );
};
export default Navigation;
