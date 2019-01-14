import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css'

const mainNavigation = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1> The Navbar</h1>
    </div>
    <nav className="main-navigation__items">
      <ul>
        <li>
          <NavLink to="/tutorial/auth">Authenticate</NavLink>
        </li>
        <li>
          <NavLink to="/tutorial/events">Events</NavLink>
        </li>
        <li>
          <NavLink to="/tutorial/bookings">Bookings</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default mainNavigation;
