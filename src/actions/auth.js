export const authorize = (userId, token, tokenExpiration) => dispatch => {
  dispatch(authorizeBegin());
  try {
      return dispatch(authorizeSuccess(userId, token, tokenExpiration));
  } catch (err) {
    dispatch(authorizeFailure(err));
  }
};

export const AUTHORIZE_BEGIN = 'AUTHORIZE_BEGIN';
export const AUTHORIZE_SUCCESS = 'AUTHORIZE_SUCCESS';
export const AUTHORIZE_FAILURE = 'AUTHORIZE FAILURE';

export const authorizeBegin = () => ({
  type: AUTHORIZE_BEGIN,
});

export const authorizeSuccess = (userId, token, tokenExpiration) => ({
  type: AUTHORIZE_SUCCESS,
  payload: {
    userId: userId,
    token: token,
    tokenExpiration: tokenExpiration
  }
});

export const authorizeFailure = err => ({
  type: AUTHORIZE_FAILURE,
  payload: err
});
