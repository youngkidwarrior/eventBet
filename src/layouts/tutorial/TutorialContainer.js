import Tutorial from './Tutorial'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    UserHash: state.contracts.UserHash,
    drizzleStatus: state.drizzleStatus
  }
}


const TutorialContainer = drizzleConnect(Tutorial, mapStateToProps);

export default TutorialContainer
