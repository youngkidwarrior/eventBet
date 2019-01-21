export const logout = () => dispatch => {
    dispatch(logoutBegin());
    try {
        return dispatch(logoutSuccess());
    } catch (err) {
      dispatch(logoutFailure(err));
    }
  };
  
  export const LOGOUT_BEGIN = 'LOGOUT_BEGIN';
  export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
  export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
  
  export const logoutBegin = () => ({
    type: LOGOUT_BEGIN,
  });
  
  export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {
      userId: null,
      token: null,
      tokenExpiration: null,
      username: null,
      email: null
    }
  });
  
  export const logoutFailure = err => ({
    type: LOGOUT_FAILURE,
    payload: err
  });
  
  
  