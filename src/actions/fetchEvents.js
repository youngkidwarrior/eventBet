export const fetchEvents = () => dispatch => {
  dispatch(fetchEventsBegin());
  try {
    const requestBody = {
      query: `
              query {
                events{
                  _id
                  title
                  description
                  date
                  price
                  creator {
                      _id
                      email
                  }
                }
              }
            `
    };
    return fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const events = resData.data.events;
        return dispatch(fetchEventsSuccess(events));
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    dispatch(fetchEventsFailure(err));
  }
};

export const FETCH_EVENTS_BEGIN = 'FETCH_EVENTS_BEGIN';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const fetchEventsBegin = () => ({
  type: FETCH_EVENTS_BEGIN
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { events }
});

export const fetchEventsFailure = err => ({
  type: FETCH_EVENTS_FAILURE,
  payload: err
});
