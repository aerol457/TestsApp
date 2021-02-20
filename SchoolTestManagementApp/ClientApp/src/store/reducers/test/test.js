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
    case actionTypes.CLEAR_TESTS:
      return updateState(state, {
        tests: [],
      });
    case actionTypes.RESET_TEST:
      return updateState(state, {
        tests: [],
        test: {},
        questions: [],
        classrooms: [],
      });
    case actionTypes.CLEAR_TEST:
      return updateState(state, {
        questions: [],
        test: {},
        classrooms: [],
      });
    case actionTypes.ARCHIVE_TEST:
      const getTests = [...state.tests];
      const updateTestsArchive = getTests.map((t) => {
        if (t.id === action.idTest) {
          t.archive = true;
        }
        return t;
      });
      return updateState(state, { tests: updateTestsArchive });
    case actionTypes.SET_TESTS:
      return updateState(state, {
        tests: action.tests,
      });
    case actionTypes.INIT_TEST:
      return updateState(state, {
        test: action.test,
      });

    case actionTypes.ADD_TEST:
      const addToTests = [...state.tests];
      addToTests.push(action.test);
      return updateState(state, {
        tests: addToTests,
        test: { ...state.test, ...action.test },
      });
    case actionTypes.UPDATE_TEST:
      const updateToTests = [...state.tests];
      let testIndex = -1;
      updateToTests.forEach((t, i) => {
        if (t.Id === action.test.Id) {
          testIndex = i;
        }
      });
      updateToTests[testIndex] = action.test;
      return updateState(state, {
        tests: updateToTests,
        test: action.test,
      });
    case actionTypes.UPDATE_TESTS:
      const updateTestsList = [...state.tests];
      let testsIndex = -1;
      updateTestsList.forEach((t, i) => {
        if (t.Id === action.test.Id) {
          testsIndex = i;
        }
      });
      updateTestsList[testsIndex] = action.test;
      return updateState(state, {
        tests: updateTestsList,
      });

    case actionTypes.ADD_QUESTION:
      const updatedTest = { ...state.test };
      updatedTest.grade = +updatedTest.grade + +action.question.value;
      return updateState(state, {
        questions: state.questions.concat(action.question),
        test: updatedTest,
      });
    case actionTypes.UPDATE_QUESTION:
      const updatedQuestion = [...state.questions];
      const updateTestGrade = { ...state.test };
      updatedQuestion[action.index] = action.question;
      let updatedGrade = 0;
      updatedQuestion.forEach((q) => (updatedGrade = updatedGrade + +q.value));
      updateTestGrade.grade = updatedGrade;
      return updateState(state, {
        questions: updatedQuestion,
        test: updateTestGrade,
      });
    case actionTypes.DELETE_QUESTION:
      const updateTest = { ...state.test };
      const updateQuestions = [...state.questions];
      const value = updateQuestions[action.index].value;
      updateQuestions.splice(action.index, 1);
      updateTest.grade -= +value;
      return updateState(state, {
        questions: updateQuestions,
        test: updateTest,
      });
    case actionTypes.SET_FULL_TEST:
      let grade = 0;
      action.questions.forEach((q) => (grade += q.value));
      const addGradeToTest = {
        ...action.test,
        grade: grade,
      };
      return updateState(state, {
        loading: false,
        questions: action.questions,
        test: addGradeToTest,
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
    case actionTypes.SET_CLASSROOMS:
      return updateState(state, { classrooms: action.classrooms });
    default:
      return state;
  }
};

export default testReducer;
