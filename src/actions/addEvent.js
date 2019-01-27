export const addEvent = event => dispatch => {
  dispatch(addEventBegin());
  try {
    return dispatch(addEventSuccess(event));
  } catch (err) {
    dispatch(addEventFailure(err));
  }
};

export const ADD_EVENT_BEGIN = 'ADD_EVENT_BEGIN';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE';

export const addEventBegin = () => ({
  type: ADD_EVENT_BEGIN
});

export const addEventSuccess = event => ({
  type: ADD_EVENT_SUCCESS,
  payload: { event }
});

export const addEventFailure = err => ({
  type: ADD_EVENT_FAILURE,
  payload: err
});
