import Auth from './Auth';
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';
import { authorize } from '../../../actions/auth';

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authorize: (userId, token, tokenExpiration) =>
      dispatch(authorize(userId, token, tokenExpiration))
  };
};

Auth.contextTypes = {
  drizzle: PropTypes.object
};

const AuthContainer = drizzleConnect(Auth, mapStateToProps, mapDispatchToProps);

export default AuthContainer;
