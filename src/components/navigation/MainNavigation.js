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
    {props.token && (
        <div className="user-info">
          <h3 className="username-header">{props.username}</h3>
          <h3 className="email-header">{props.email}</h3>
        </div>
      )}
  </header>
);

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

export default drizzleConnect(mainNavigation, mapStateToProps);
