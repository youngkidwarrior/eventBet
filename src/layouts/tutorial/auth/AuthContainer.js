import Auth from './Auth';
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';
import { authorize } from '../../../actions/tokenAuth';
import { userInfo } from '../../../actions/userInfo';

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus
  };
};

const mapDispatchToProps = dispatch => ({
  authorize: (userId, token, tokenExpiration) =>
    dispatch(authorize(userId, token, tokenExpiration)),
  userInfo: (username, email) => dispatch(userInfo(username, email))
});

Auth.contextTypes = {
  drizzle: PropTypes.object
};

const AuthContainer = drizzleConnect(Auth, mapStateToProps, mapDispatchToProps);

export default AuthContainer;
