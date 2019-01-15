import Auth from './Auth'
import { drizzleConnect } from 'drizzle-react'


const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    submitAuth: props.submitAuth,
  }
}

const AuthContainer = drizzleConnect(Auth, mapStateToProps);

export default AuthContainer
