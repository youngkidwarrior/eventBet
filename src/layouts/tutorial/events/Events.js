import React, { Component } from 'react';
import './Events.css';
import { Link } from 'react-router-dom';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Link to="/tutorial">Tutorial</Link>
        <h1> The Events Page</h1>
      </div>
    );
  }
}

export default Events;
