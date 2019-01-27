import React from 'react';
import './parcel.css';
import { drizzleConnect } from 'drizzle-react';

const Parcel = props => (
  <div className="parcel-container">
    <div className="parcel-title" />
    <div className="parcel-main">
      <div className="parcel-left">
        <div className="parcel-circle-container">
          <div className="parcel-circle moveable " />
        </div>
        <div className="parcel-circle-container">
          <div className="parcel-circle moveable offset" />
        </div>
        <div className="parcel-circle-container">
          <div className="parcel-circle moveable " />
        </div>
      </div>
      <div className="parcel-divider">
        <div className="parcel-divder-line" />
      </div>
      <div className="parcel-right" />
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    token: state.authorize.token,
    userId: state.authorize.userId,
    tokenExpiration: state.authorize.tokenExpiration,
    username: state.authorize.username,
    email: state.authorize.email
  };
};

export default drizzleConnect(Parcel, mapStateToProps, mapDispatchToProps);
