import React, { Component } from 'react';
import './Bookings.css';
import { Link } from 'react-router-dom';

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Link to="/tutorial">Tutorial</Link>
        <h1>The Bookings Page</h1>
      </div>
    );
  }
}

export default Bookings;
