import Events from './Events';
import { drizzleConnect } from 'drizzle-react';
import { fetchEvents } from '../../../actions/fetchEvents';
import { addEvent } from '../../../actions/addEvent';

const mapStateToProps = state => {
  console.log(state);
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    token: state.authorize.token,
    userId: state.authorize.userId,
    eventList: state.eventLog.eventList,
    isLoading: state.eventLog.loading
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  addEvent: event => dispatch(addEvent(event))
});

const EventsContainer = drizzleConnect(
  Events,
  mapStateToProps,
  mapDispatchToProps
);

export default EventsContainer;
