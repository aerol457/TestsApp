import * as actionTypes from "../../actions/auth/actionTypes";
import updateState from "../../utils/utility";

const initialState = {
  token: null,
  idUser: null,
  error: null,
  loading: false,
  userProfile: {},
};

const authStart = (state, action) => {
  return updateState(state, {
    loading: true,
    error: null,
  });
};

const actionSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    error: null,
  });
};

const authSuccess = (state, action) => {
  return updateState(state, {
    token: action.token,
    idUser: action.idUser,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateState(state, {
    loading: false,
    error: action.error,
  });
};

const authLogout = (state, action) => {
  return updateState(state, {
    token: null,
    idUser: null,
    userProfile: {},
  });
};

const setProfile = (state, action) => {
  return updateState(state, {
    userProfile: action.data,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.ACTION_SUCCESS:
      return actionSuccess(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_USER_DETAILS:
      return setProfile(state, action);
    default:
      return state;
  }
};
export default authReducer;
