import Auth from './Auth'
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react'


const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    submitAuth: props.submitAuth,
  }
}

Auth.contextTypes ={
  drizzle: PropTypes.object
}

const AuthContainer = drizzleConnect(Auth, mapStateToProps);

export default AuthContainer
