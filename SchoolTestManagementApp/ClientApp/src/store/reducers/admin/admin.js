import * as actionTypes from "../../actions/admin/actionTypes";
import updateState from "../../utils/utility";

const initialState = {
  teacherClass: [],
  teacherDetails: null,
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
        teacherClass: [],
        teacherDetails: null,
      });
    case actionTypes.ACTION_FAIL:
      return updateState(state, {
        error: action.error,
        loading: false,
        teacherClass: [],
        teacherDetails: null,
      });
    case actionTypes.ACTION_INIT_ERROR:
      return updateState(state, { error: null });
    case actionTypes.INTI_USER_CLASS:
      return updateState(state, {
        teacherDetails: action.user,
        teacherClass: action.classrooms,
      });
    case actionTypes.ADD_TEACHER_CLASS:
      const addToTeacherClassroom = state.teacherClass.map((c) => {
        if (c.id === action.data.idClassroom) {
          return { ...c, isAssign: true };
        }
        return c;
      });
      return updateState(state, { teacherClass: addToTeacherClassroom });
    case actionTypes.REMOVE_TEACHER_CLASS:
      const removeToTeacherClassroom = state.teacherClass.map((c) => {
        if (c.id === action.data.idClassroom) {
          return { ...c, isAssign: false };
        }
        return c;
      });
      return updateState(state, { teacherClass: removeToTeacherClassroom });
    default:
      return state;
  }
};

export default adminReducer;
