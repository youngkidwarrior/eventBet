import React, { Component } from 'react';
import './Auth.css';
import { Link, Redirect } from 'react-router-dom';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.state = {
      auth: false,
      goHome: false
    };
  }

  handleSubmitAuth = e => {
    e.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
            email
          }
        }
      `
    };

    if (this.state.auth) {
      requestBody = {
        query: `
          query {
            login(email: "${email}", password:"${password}"){
              userId
              token
              tokenExpiration
            }
          }
        `
      };
    }

    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });

    this.props.submitAuth();
    this.setState({
      auth: true,
      goHome: true
    });
  };

  switchModeHandler = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { auth: !prevState.auth };
    });
  };

  render() {
    return (
      <div>
        {this.state.goHome ? <Redirect to="/tutorial" /> : null}
        <h1> The Auth Page</h1>
        <form className="auth-form" onSubmit={this.handleSubmitAuth}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={this.emailEl} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordEl} />
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={this.switchModeHandler}>
              Switch to {this.state.auth ? 'Signup' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
