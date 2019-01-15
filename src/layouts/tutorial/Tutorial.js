import React, { Component } from 'react';
import './Tutorial.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import AuthContainer from './auth/AuthContainer';
import BookingsContainer from './bookings/BookingsContainer';
import EventsContainer from './events/EventsContainer';
import MainNavigation from '../../components/navigation/MainNavigation';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }

  submitAuth = () => {
    this.setState({
      auth: true
    });
  }

  render() {
    return (
      <div>
        <MainNavigation auth={this.state.auth}/>
        {this.state.auth ? null : <Redirect to="/tutorial/auth" />}
        <div className="main-content">
          <Switch>
            <Route
              path="/tutorial/auth"
              render={props => (
                <AuthContainer
                  {...props}
                  submitAuth={this.submitAuth}
                />
              )}
            />
            <Route path="/tutorial/bookings" component={BookingsContainer} />
            <Route path="/tutorial/events" component={EventsContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Tutorial;
