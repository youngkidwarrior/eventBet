import Events from './Events'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
    console.log(state)
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus
  }
}

const EventsContainer = drizzleConnect(Events, mapStateToProps);

export default EventsContainer
