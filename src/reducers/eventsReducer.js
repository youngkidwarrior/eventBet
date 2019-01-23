const fetchEventsReducer = (state = { eventList: [] }, action) => {
  switch (action.type) {
    case 'FETCH_EVENTS_BEGIN':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_EVENTS_SUCCESS':
      return {
        ...state,
        eventList: action.payload.events,
        loading: false
      };
    case 'FETCH_EVENTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.err
      };
    default:
      return state;
  }
};

export default fetchEventsReducer;
