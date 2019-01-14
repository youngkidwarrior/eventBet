import React, { Component } from 'react';
import {
  AccountData,
  ContractData,
  ContractForm
} from 'drizzle-react-components';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipfsHash: '',
      ethAddress: '',
      loading: false,
      User: {
        username: '',
        title: '',
        description: '',
        address: ''
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      // ethAddress: this.props.UserHash,
      loading: true,
      User: {
        username: this.username.value,
        title: this.title.value,
        description: this.description.value,
        address: this.props.accounts[0]
      }
    });
  }

  // add(buffer) {
  //   ipfs.add(buffer).then(result => {
  //     this.setState({ ipfsHash: result[0].hash, loading: false }, () =>
  //       ipfs.get(this.state.ipfsHash)
  //       // this.publish(this.state.ipfsHash)
  //     );
  //   });
  // }

  // publish(hash) {
  //   console.log(JSON.stringify(hash))
  //   ipfs.name.publish(hash).then(res => {
  //     console.log(res.text());
  //   });
  // }

  // createUser() {
  //   var title = $('#sign - up - title').val();
  //   var intro = $('#sign - up - intro').val();
  //   // var ipfsHash = '';
  //   var ipfsHash = 'not-available';
  //   console.log('creating user on eth for', username, title, intro, ipfsHash);
  //   User.deployed().then(function (contractInstance) {
  //     contractInstance.createUser(username, ipfsHash, { gas: 200000, from: web3.eth.accounts[0] }).then(function (success) {
  //       if (success) {
  //         console.log('created user on ethereum!');
  //       } else {
  //         console.log('error creating user on ethereum');
  //       }
  //     }).catch(function (e) {
  //       // There was an error! Handle it.
  //       console.log('error creating user: ', username, ': ', e);
  //     });
  //   });
  // }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-list">
            <Link to="/">Profiles</Link>

            <ul>
              <li>
                <Link to="/">Home></Link>
              </li>
              <li>
                <Link to="/tutorial">Tutorial</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          {!this.state.loading ? (
            <form>
              <h5> Create your Profile</h5>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="signup-username"
                  ref={el => (this.username = el)}
                />
              </div>
              <br />

              <div>
                <label htmlFor="username">Title</label>
                <input
                  type="text"
                  className="signup-title"
                  ref={el => (this.title = el)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="username">Short description</label>
                <textarea
                  rows="2"
                  className="signup-description"
                  ref={el => (this.description = el)}
                />
              </div>
              <br />
              <div>
                ETH Address:
                <span className="eth-address" />
                <AccountData accountIndex="0" units="ether" precision="3" />
              </div>
              <button
                type="submit"
                className="signup-submit"
                onClick={this.handleSubmit.bind(this)}
              >
                Sign Up
              </button>
            </form>
          ) : (
            <div>loading</div>
          )}
          <ContractForm contract="UserHash" method="setHash" />
        </div>
        <div className="users" />
      </div>
    );
  }
}

export default Home;
