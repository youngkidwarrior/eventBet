import Tutorial from './Tutorial'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = (state, props) => {
  console.log(state)
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    UserHash: state.contracts.UserHash,
    drizzleStatus: state.drizzleStatus,
    token: state.authorize.token,
    userId: state.authorize.userId,
    tokenExpiration: state.authorize.tokenExpiration
  }
}


const TutorialContainer = drizzleConnect(Tutorial, mapStateToProps);

export default TutorialContainer
