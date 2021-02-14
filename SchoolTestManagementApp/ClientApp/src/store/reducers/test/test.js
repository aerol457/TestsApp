import * as actionTypes from "../../actions/test/actionsTypes";
import updateState from "../../utils/utility";

const initialTest = {
  tests: [],
  test: {},
  classrooms: [],
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
        tests: [],
        test: {},
        questions: [],
      });
    case actionTypes.SET_TESTS:
      return updateState(state, {
        tests: action.tests,
      });
    case actionTypes.SET_TEST_DETAILS:
      return updateState(state, {
        test: { ...state.test, ...action.test },
        questions: [],
      });
    case actionTypes.ADD_TEST:
      const updateTests = [...state.tests];
      updateTests.push(action.data);
      return updateState(state, {
        tests: updateTests,
      });
    case actionTypes.CLEAR_TEST:
      return updateState(state, {
        classrooms: [],
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
    case actionTypes.SET_FULL_TEST:
      return updateState(state, {
        loading: false,
        questions: action.questions,
        test: action.test,
        classrooms: action.classrooms,
      });
    case actionTypes.INSERT_USER_ANSWER:
      const questions = [...state.questions];
      if (action.answer) {
        questions[action.index].userAnswer1 = action.answer;
      } else {
        questions[action.index].userAnswer1 = action.multipleAnswers[0] || 0;
        questions[action.index].userAnswer2 = action.multipleAnswers[1] || 0;
      }
      return updateState(state, { questions: questions });
    case actionTypes.FINISH_TEST:
      let tests = [...state.tests];
      const updatedTests = tests.map((t) => {
        if (t.id === action.test.id) {
          t.studentTest[0].isPass = action.grade >= t.passingGrade;
          t.studentTest[0].isDone = true;
          t.studentTest[0].grade = action.grade;
        }
        return t;
      });
      return updateState(state, { tests: updatedTests });
    case actionTypes.ADD_TEST_CLASSROOMS:
      return updateState(state, { classrooms: action.classrooms });
    default:
      return state;
  }
};

export default testReducer;
