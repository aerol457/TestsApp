import * as actionTypes from "../../actions/student/actionTypes";
import updateState from "../../utils/utility";

const initialState = {
  search: [],
  students: [],
  student: {},
  tests: [],
  loading: false,
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_START_STUDENT:
      return updateState(state, { loading: true, error: null });
    case actionTypes.ACTION_FAIL_STUDENT:
      return updateState(state, { loading: false, error: action.error });
    case actionTypes.ACTION_SUCCESS_STUDENT:
      return updateState(state, { loading: false, error: null });
    case actionTypes.CLEAR_TESTS_STUDENT:
      return updateState(state, { student: {}, tests: [] });
    case actionTypes.INIT_STUDENT:
      return updateState(state, {
        students: [],
        student: {},
        tests: [],
        search: [],
      });
    case actionTypes.GET_ALL_STUDENTS:
      return updateState(state, {
        students: action.students,
        search: action.students,
      });
    case actionTypes.GET_ALL_STUDENT_TESTS:
      return updateState(state, {
        tests: action.tests,
        student: action.student,
      });
    default:
      return state;
  }
};

export default studentReducer;
