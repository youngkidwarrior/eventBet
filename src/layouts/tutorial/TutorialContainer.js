import Tutorial from './Tutorial'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    UserHash: state.contracts.UserHash,
    drizzleStatus: state.drizzleStatus,
    token: state.auth.token,
    userId: state.auth.userId,
    tokenExpiration: state.auth.tokenExpiration
  }
}


const TutorialContainer = drizzleConnect(Tutorial, mapStateToProps);

export default TutorialContainer
