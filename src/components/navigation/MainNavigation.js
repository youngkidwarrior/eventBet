import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
import { drizzleConnect } from 'drizzle-react';
import { slide as Menu } from 'react-burger-menu';
import { logout } from '../../actions/logout';

const MainNavigation = props => (
  <Menu
    className="main-navigation"
    burgerButtonClassName={props.menuToggle ? 'hide-menu' : ''}
    customBurgerIcon={
      <img
        alt="burger_icon"
        src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"
      />
    }
  >
    <div className="main-navigation__logo">
      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>
    </div>
    <hr className="main-navigation__spacer"></hr>
    <nav className="main-navigation__items">
      <ul>
        {!props.token && (
          <li>
            <NavLink to="/tutorial/auth">Authenticate</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/tutorial/events">Events</NavLink>
        </li>
        {props.token && (
          <React.Fragment>
            <li>
              <NavLink to="/tutorial/bookings">Bookings</NavLink>
            </li>
            <li>
              <button type="button" onClick={props.logout}>
                Logout
              </button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
    {props.token && (
      <div className="user-info">
        <h3 className="username-header">{props.username}</h3>
        <h3 className="email-header">{props.email}</h3>
      </div>
    )}
  </Menu>
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    token: state.authorize.token,
    userId: state.authorize.userId,
    tokenExpiration: state.authorize.tokenExpiration,
    username: state.authorize.username,
    email: state.authorize.email
  };
};

export default drizzleConnect(
  MainNavigation,
  mapStateToProps,
  mapDispatchToProps
);
