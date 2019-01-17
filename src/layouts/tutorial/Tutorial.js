import React, { Component } from 'react';
import './Tutorial.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthContainer from './auth/AuthContainer';
import BookingsContainer from './bookings/BookingsContainer';
import EventsContainer from './events/EventsContainer';
import MainNavigation from '../../components/navigation/MainNavigation';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      userId: props.userId,
      tokenExpiration: props.tokenExpiration
    };
  }

  render() {
    return (
      <div>
        <MainNavigation />
        <div className="main-content">
          <Switch>
            {!this.props.token && (
              <Redirect from="/tutorial" to="/tutorial/auth" exact />
            )}
            {this.props.token && (
              <Redirect from="/tutorial" to="/tutorial/events" exact />
            )}
            {this.props.token && (
              <Redirect from="/tutorial/auth" to="/tutorial/events" exact />
            )}
            {!this.props.token && (
              <Route path="/tutorial/auth" component={AuthContainer} />
            )}
            <Route path="/tutorial/events" component={EventsContainer} />
            {this.props.token && (
              <Route path="/tutorial/bookings" component={BookingsContainer} />
            )}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Tutorial;
