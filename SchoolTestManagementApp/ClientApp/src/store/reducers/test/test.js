import * as actionTypes from "../../actions/test/actionsTypes";
import updateState from "../../utils/utility";

const initialTest = {
  search: [],
  tests: [],
  test: {},
  questions: [],
  loading: false,
  error: null,
};

const testReducer = (state = initialTest, action) => {
  switch (action.type) {
    case actionTypes.ACTION_START_TEST:
      return updateState(state, { loading: true, error: null });
    case actionTypes.ACTION_SUCCESS_TEST:
      return updateState(state, { loading: false, error: null });
    case actionTypes.ACTION_FAIL_TEST:
      return updateState(state, { loading: false, error: action.error });
    case actionTypes.INIT_TEST:
      return updateState(state, {
        search: [],
        tests: [],
        test: {},
        questions: [],
      });
    case actionTypes.ACTION_FAIL_TIMER:
      return updateState(state, { loading: false, error: null });
    case actionTypes.INITIAL_SEARCH_TEST:
      return updateState(state, { search: [] });
    case actionTypes.SET_TESTS:
      return updateState(state, {
        tests: action.tests,
        search: action.tests,
      });
    case actionTypes.ADD_TEST_DETAILS:
      return updateState(state, { test: action.data, questions: [] });
    case actionTypes.ADD_TEST:
      const updateTests = [...state.tests];
      updateTests.push(action.data);
      return updateState(state, {
        tests: updateTests,
      });
    case actionTypes.CLEAR_TEST:
      return updateState(state, {
        questions: [],
        test: {},
      });
    case actionTypes.ADD_QUESTION:
      const updatedTest = { ...state.test };
      updatedTest.grade = +updatedTest.grade + +action.data.value;
      return updateState(state, {
        questions: state.questions.concat(action.data),
        test: updatedTest,
      });
    case actionTypes.UPDATE_QUESTION:
      const updatedQuestionsList = state.questions.filter(
        (q) => q.position !== action.id
      );
      const test = { ...state.test };
      updatedQuestionsList.push(action.data);
      let updatedGrade = 0;
      updatedQuestionsList.map((q) => (updatedGrade = updatedGrade + +q.value));
      console.log(updatedGrade);
      test.grade = updatedGrade;
      return updateState(state, {
        questions: [...updatedQuestionsList],
        test: test,
      });
    case actionTypes.UPDATE_VIEW_QUESTION:
      return updateState(state, { questions: action.data });
    case actionTypes.ORDER_VIEW_QUESTION:
      return updateState(state, {
        questions: state.questions.sort((a, b) => b.position - a.position),
      });
    case actionTypes.DELETE_QUESTION:
      const updatedList = state.questions.filter(
        (q) => q.position !== action.id
      );
      const updateTest = { ...state.test };
      const question = state.questions.find((q) => q.position === action.id);
      updateTest.grade -= +question.value;
      const updateIdList = updatedList.map((q) => {
        if (q.position > action.id) {
          const updateObj = { ...q };
          updateObj.position -= 1;
          return updateObj;
        }
        return q;
      });
      return updateState(state, {
        questions: updateIdList,
        test: updateTest,
      });
    case actionTypes.SET_TEST_QUESTION:
      return updateState(state, {
        loading: false,
        questions: action.questions,
        test: action.test,
      });
    default:
      return state;
  }
};

export default testReducer;
