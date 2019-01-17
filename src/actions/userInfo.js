export const userInfo = (username, email) => dispatch => {
    dispatch(userInfoBegin());
    try {
        return dispatch(userInfoSuccess(username, email));
    } catch (err) {
      dispatch(userInfoFailure(err));
    }
  };
  
  export const USER_INFO_BEGIN = 'USER_INFO_BEGIN';
  export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
  export const USER_INFO_FAILURE = 'USER_INFO FAILURE';
  
  export const userInfoBegin = () => ({
    type: USER_INFO_BEGIN,
  });
  
  export const userInfoSuccess = (username, email) => ({
    type: USER_INFO_SUCCESS,
    payload: {
      username: username,
      email: email
    }
  });
  
  export const userInfoFailure = err => ({
    type: USER_INFO_FAILURE,
    payload: err
  });
  
  
  