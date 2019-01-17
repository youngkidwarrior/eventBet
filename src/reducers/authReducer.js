const authReducer = (
  state = { userId: null, token: null, tokenExpiration: null },
  action
) => {
  switch (action.type) {
    case 'AUTHORIZE_BEGIN':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'AUTHORIZE_SUCCESS':
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        tokenExpiration: action.payload.tokenExpiration,
        loading: false
      };
    case 'AUTHORIZE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.err
      };
    default:
      return state;
  }
};

export default authReducer;
