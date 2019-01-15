import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

const mainNavigation = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <NavLink to="/tutorial">
        <h1>The Navbar</h1>
      </NavLink>
    </div>
    <nav className="main-navigation__items">
      <ul>
        <li>
          <NavLink to="/tutorial/auth">Authenticate</NavLink>
        </li>
        {props.auth ? (
          <React.Fragment>
            <li>
              <NavLink to="/tutorial/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/tutorial/bookings">Bookings</NavLink>
            </li>
          </React.Fragment>
        ) : null}
      </ul>
    </nav>
  </header>
);

export default mainNavigation;
