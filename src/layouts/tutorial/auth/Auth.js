import React, { Component } from 'react';
import './Auth.css';

class Auth extends Component {
  constructor(props, context) {
    super(props);
    this.web3 = context.drizzle.web3;
    this.emailEl = React.createRef();
    this.usernameEL = React.createRef();
    this.state = {
      auth: false
    };
  }

  login() {
    const address = this.props.accounts[0].toLowerCase();
    if (address.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
        query {
          login(address:"${address}"){
            _id
            username
            email
            nonce
          }
        }
      `
    };
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
        this.props.userInfo(
          resData.data.login.username,
          resData.data.login.email
        );
        const nonce = resData.data.login.nonce;
        this.handleSignMessage(address, nonce).then(result => {
          this.handleVerify(result.address, result.signature);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleVerify = (address, signature) => {
    let requestBody = {
      query: `
        query {
          verify(address: "${address}", signature: "${signature}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        this.props.authorize(
          resData.data.verify.userId,
          resData.data.verify.token,
          resData.data.verify.tokenExpiration
        );
      });
  };
  handleSignMessage = (address, nonce) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.personal.sign(
        this.web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        address,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ address, signature });
        }
      );
    });
  };

  signup() {
    const email = this.emailEl.current.value;
    const username = this.usernameEL.current.value;
    const address = this.props.accounts[0].toLowerCase();
    if (email.trim().length === 0 || address.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
        mutation {
          createUser(userInput: {username: "${username}", email: "${email}", address: "${address}"}) {
            _id
            username
            email
          }
        }
      `
    };
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
      .then(this.login())
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmitAuth = e => {
    e.preventDefault();
    if (this.state.auth) {
      this.login();
    } else {
      this.signup();
    }
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
        <h1> The Auth Page</h1>
        <form className="auth-form" onSubmit={this.handleSubmitAuth}>
          {!this.state.auth ? (
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" ref={this.usernameEL} />
            </div>
          ) : null}
          {!this.state.auth ? (
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={this.emailEl} />
            </div>
          ) : null}
          <div className="form-actions">
            <button type="submit">
              {!this.state.auth ? 'Submit' : 'Login'}
            </button>
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
