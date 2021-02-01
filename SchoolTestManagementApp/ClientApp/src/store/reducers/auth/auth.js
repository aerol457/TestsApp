import * as actionTypes from "../../actions/auth/actionTypes";
import updateState from "../../utils/utility";

const initialState = {
  token: null,
  idUser: null,
  error: null,
  loading: false,
  userProfile: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateState(state, { loading: true, error: null });
    case actionTypes.ACTION_SUCCESS:
      return updateState(state, { loading: false, error: null });
    case actionTypes.AUTH_SUCCESS:
      return updateState(state, { token: action.token, idUser: action.idUser });
    case actionTypes.AUTH_FAIL:
      return updateState(state, { loading: false, error: action.error });
    case actionTypes.RESET_ERROR:
      return updateState(state, { error: null, loading: false });
    case actionTypes.AUTH_LOGOUT:
      return updateState(state, { token: null, idUser: null, userProfile: {} });
    case actionTypes.SET_USER_DETAILS:
      return updateState(state, { userProfile: action.data });
    default:
      return state;
  }
};
export default authReducer;
