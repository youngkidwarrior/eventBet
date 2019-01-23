import Events from './Events';
import { drizzleConnect } from 'drizzle-react';
import { fetchEvents } from '../../../actions/fetchEvents';

const mapStateToProps = state => {
  console.log(state);
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    token: state.authorize.token,
    eventList: state.eventLog.eventList
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
});

const EventsContainer = drizzleConnect(
  Events,
  mapStateToProps,
  mapDispatchToProps
);

export default EventsContainer;
