import React, { Component } from 'react';
import './Tutorial.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import AuthContainer from './auth/AuthContainer';
import BookingsContainer from './bookings/BookingsContainer';
import EventsContainer from './events/EventsContainer';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
    this.submitAuth = this.submitAuth.bind(this);
    this.unAuthorize = this.unAuthorize.bind(this);
  }

  submitAuth() {
    this.setState({
      auth: true
    });
  }
  unAuthorize() {
    this.setState({
      auth: false
    });
  }
  displayNav() {
    return (
      <nav>
        <div>
          <Link to="/">Home</Link>
          <ul>
            <li>
              <Link to="/tutorial/auth">Auth</Link>
            </li>
            <li>
              <Link to="/tutorial/events">Events</Link>
            </li>
            <li>
              <Link to="/tutorial/bookings">Bookings</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  render() {
      console.log(this.state.auth)
    return (
      <div>
        {this.state.auth
          ? this.displayNav()
          : <Redirect to='/tutorial/auth'/>}
        <Switch>
          <Route
            path="/tutorial/auth"
            render={props => (
              <AuthContainer
                {...props}
                unAuth={this.unAuthorize}
                submitAuth={this.submitAuth}
              />
            )}
          />
          <Route path="/tutorial/bookings" component={BookingsContainer} />
          <Route path="/tutorial/events" component={EventsContainer} />
        </Switch>
      </div>
    );
  }
}

export default Tutorial;