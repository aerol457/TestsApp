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
      return updateState(state, { loading: false });
    case actionTypes.RESET_ERROR_TEST:
      return updateState(state, { error: null });
    case actionTypes.ACTION_FAIL_TEST:
      return updateState(state, { loading: false, error: action.error });
    case actionTypes.INIT_TEST:
      return updateState(state, {
        search: [],
        tests: [],
        test: {},
        questions: [],
      });
    case actionTypes.INITIAL_SEARCH_TEST:
      return updateState(state, { search: [] });
    case actionTypes.SET_TESTS:
      return updateState(state, {
        tests: action.tests,
        search: action.tests,
      });
    case actionTypes.ADD_TEST_DETAILS:
      return updateState(state, { test: action.data, questions: [] });
    case actionTypes.UPDATE_TEST_DETAILS:
      const updateTestDetails = { ...state.test };
      updateTestDetails.name = action.test.name;
      updateTestDetails.professionName = action.test.professionName;
      updateTestDetails.time = action.test.time;
      updateTestDetails.dateOfSubmission = action.test.dateOfSubmission;
      return updateState(state, { test: updateTestDetails, questions: [] });
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
      const updatedQuestion = [...state.questions];
      const updateTestGrade = { ...state.test };
      const index = state.questions.findIndex(
        (q) => q.position === action.question.position
      );
      updatedQuestion[index] = action.question;
      let updatedGrade = 0;
      updatedQuestion.forEach((q) => (updatedGrade = updatedGrade + +q.value));
      updateTestGrade.grade = updatedGrade;
      return updateState(state, {
        questions: updatedQuestion,
        test: updateTestGrade,
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
    case actionTypes.INSERT_USER_ANSWER:
      const questions = [...state.questions];
      let updatedQuestions = questions.map((q) => {
        if (q.id === action.question.id) {
          if (
            action.question.questionType === "option" ||
            action.question.questionType === "image"
          ) {
            q.userAnswer1 = action.answer;
          } else {
            if (action.multipleAnswers.length > 0) {
              q.userAnswer1 = action.multipleAnswers[0];
              if (action.multipleAnswers.length === 2) {
                q.userAnswer2 = action.multipleAnswers[1];
              } else {
                q.userAnswer2 = 0;
              }
            } else {
              q.userAnswer1 = 0;
              q.userAnswer2 = 0;
            }
          }
        }
        return q;
      });
      return updateState(state, { questions: updatedQuestions });
    case actionTypes.FINISH_TEST:
      let getGrade = { ...state.test };
      getGrade.grade = action.grade;
      return updateState(state, { test: getGrade });
    default:
      return state;
  }
};

export default testReducer;
