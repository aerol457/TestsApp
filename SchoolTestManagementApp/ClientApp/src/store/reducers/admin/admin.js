import * as actionTypes from "../../actions/admin/actionTypes";
import updateState from "../../utils/utility";

const initialState = {
  userClass: [],
  userDetails: null,
  loading: false,
  error: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_START_TEACHER_CLASS:
      return updateState(state, { loading: true });
    case actionTypes.ACTION_SUCCESS_TEACHER_CLASS:
      return updateState(state, { loading: false });
    case actionTypes.ACTION_RESET_ADMIN:
      return updateState(state, {
        error: null,
        loading: false,
        userClass: [],
        userDetails: null,
      });
    case actionTypes.ACTION_FAIL:
      return updateState(state, {
        error: action.error,
        loading: false,
        userClass: [],
        userDetails: null,
      });
    case actionTypes.ACTION_INIT_ERROR:
      return updateState(state, { error: null });
    case actionTypes.INTI_USER_CLASS:
      return updateState(state, {
        userDetails: action.user,
        userClass: action.classrooms,
      });
    case actionTypes.ADD_TEACHER_CLASS:
      const userClassroom = state.userClass.map((c) => {
        if (c.id === action.data.idClassroom) {
          return { ...c, isAssign: true };
        }
        return c;
      });
      return updateState(state, { userClass: userClassroom });
    case actionTypes.REMOVE_TEACHER_CLASS:
      const userRemoveClassroom = state.userClass.map((c) => {
        if (c.id === action.data.idClassroom) {
          return { ...c, isAssign: false };
        }
        return c;
      });
      return updateState(state, { userClass: userRemoveClassroom });
    case actionTypes.UPDATE_STUDENT_CLASS:
      const updateStudentClass = { ...state.userDetails };
      const updateClasses = state.userClass.map((c) => {
        if (c.id === +action.user.idClassroom) {
          c.isAssign = true;
        } else {
          c.isAssign = false;
        }
        return c;
      });
      updateStudentClass.idClassroom = +action.user.idClassroom;
      updateStudentClass.idClassroomNavigation.id = +action.user.idClassroom;
      updateStudentClass.idClassroomNavigation.name = action.user.className;
      return updateState(state, {
        userDetails: updateStudentClass,
        userClass: updateClasses,
      });
    default:
      return state;
  }
};

export default adminReducer;
