import React, { Component } from 'react';
import './Auth.css';
import { Link, Redirect } from 'react-router-dom';

class Auth extends Component {
  constructor(props, context) {
    super(props);
    this.emailEl = React.createRef();
    this.state = {
      auth: false,
      goHome: false
    };
  }

  //////////////////////////////////////////////////////////////////////////////
  //THIS FLOW IS WEIRD. NEEDS TO BE SEPERATED INTO FUNCTIONS AND REDUX ACTIONS//
  //////////////////////////////////////////////////////////////////////////////
  //First request body is sent depending on auth state
  //if logging in, user sends email and address to server, server then 
  //returns user object. The users then signs with its nonce and uses the signature
  //in the verify query
  handleSubmitAuth = e => {
    e.preventDefault();
    const email = this.emailEl.current.value;
    // const password = this.passwordEl.current.value;
    const address = this.props.accounts[0].toLowerCase();
    if (email.trim().length === 0 || address.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        mutation {
          createUser(userInput: {email: "${email}", address: "${address}"}) {
            _id
            email
            nonce
          }
        }
      `
    };

    if (this.state.auth) {
      requestBody = {
        query: `
          query {
            login(email: "${email}", address:"${address}"){
              _id
              address
              nonce
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
        if (this.state.auth) {
          const nonce = resData.data.login.nonce;
          this.handleSignMessage(address, nonce).then(result => {
            this.handleVerify(result.address, result.signature);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.props.submitAuth();
    // this.setState({
    //   auth: true,
    //   goHome: true
    // });
  };

  handleVerify = (address, signature) => {
    let requestBody = {
      query: `
        query {
          verify(address: "${address}", signature: "${signature}") {
            token
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
    }).then(res => console.log(res.json()));
  };

  handleSignMessage = (address, nonce) => {
    const web3 = this.context.drizzle.web3;
    return new Promise((resolve, reject) => {
      web3.eth.personal.sign(
        web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        address,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ address, signature });
        }
      );
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
