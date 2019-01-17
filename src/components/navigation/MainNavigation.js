import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
import { drizzleConnect } from 'drizzle-react';

const mainNavigation = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <NavLink to="/tutorial">
        <h1>The Navbar</h1>
      </NavLink>
    </div>
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
          <li>
            <NavLink to="/tutorial/bookings">Bookings</NavLink>
          </li>
        )}
      </ul>
    </nav>
  </header>
);

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    token: state.auth.token,
    userId: state.auth.userId,
    tokenExpiration: state.auth.tokenExpiration
  };
};

export default drizzleConnect(mainNavigation, mapStateToProps);
