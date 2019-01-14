import React, { Component } from 'react';
import './Auth.css';
import { Link, Redirect } from 'react-router-dom';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      toTutorial: false
    };
  }

  handleSubmitAuth = e => {
    e.preventDefault();
    this.props.submitAuth();
    this.setState({
      auth: true,
      toTutorial: true
    });
  };

  handleUnAuth = e => {
    e.preventDefault();
    this.props.unAuth();
    this.setState({
      auth: false,
      toTutorial: false
    });
  };

  render() {
    return (
      <div>
        {this.state.toTutorial ? <Redirect to="/tutorial" /> : null}
        {this.state.auth ? <Link to="/tutorial">Tutorial</Link> : null}
        <h1> The Auth Page</h1>
        <button onClick={this.handleSubmitAuth}>Authorize</button>
        <button onClick={this.handleUnAuth}>Unauthorize</button>
      </div>
    );
  }
}

export default Auth;
