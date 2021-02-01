import axios from "axios";
import * as actionTypes from "../../actions/test/actionsTypes";
import { authLogout } from "../index";

const actionStart = () => {
  return {
    type: actionTypes.ACTION_START_TEST,
  };
};

const actionSuccess = () => {
  return {
    type: actionTypes.ACTION_SUCCESS_TEST,
  };
};

export const initTest = () => {
  return {
    type: actionTypes.INIT_TEST,
  };
};

const actionFail = (error) => {
  return {
    type: actionTypes.ACTION_FAIL_TEST,
    error: error,
  };
};

export const triggerErrorTimer = () => {
  return {
    type: actionTypes.ACTION_FAIL_TIMER,
  };
};

export const getAllTest = ({ userType, id }) => {
  const token = localStorage.getItem("token");
  let url = `https://localhost:44356/api/Test/all-tests/${id}`;
  if (userType === "student") {
    url = `https://localhost:44356/api/StudentTest/allTests/${id}`;
  }
  return (dispatch) => {
    dispatch(actionStart());
    try {
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          dispatch(setTests(res.data.tests));
          dispatch(actionSuccess());
        })
        .catch((err) => actionFail(err));
    } catch (err) {
      dispatch(actionFail(err));
    }
  };
};

const setTests = (tests) => {
  return {
    type: actionTypes.SET_TESTS,
    tests: tests,
  };
};

export const findMyTests = (searchInput) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    if (searchInput === "") {
      dispatch(getAllTest());
    } else {
      dispatch(actionStart());
      axios
        .get(`https://localhost:44356/api/Test/${searchInput}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data.success == "false") {
            dispatch(getAllTest());
            dispatch(actionFail("Not Found Test"));
          } else {
            dispatch(setTests(res.data.test));
          }
        })
        .catch((err) => actionFail(err));
    }
  };
};

export const initialSearchTest = () => {
  return {
    type: actionTypes.INITIAL_SEARCH_TEST,
  };
};

export const addTestDetails = (test) => {
  return {
    type: actionTypes.ADD_TEST_DETAILS,
    data: test,
  };
};

export const addTest = (test) => {
  const formData = new FormData();
  test.questionList.map((q) => {
    if (q.questionType !== "image") {
      return;
    }
    formData.append("images", q.imageFile, q.imageUrl);
  });

  return (dispatch) => {
    const idUser = localStorage.getItem("idUser");
    const token = localStorage.getItem("token");
    if (!token || !idUser) {
      return dispatch(authLogout());
    }
    dispatch(actionStart());
    test.idUser = idUser;
    axios
      .post("https://localhost:44356/api/Test", test, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        axios
          .post(
            "https://localhost:44356/api/Test/CreateQuestionImages",
            formData
          )
          .then((res) => {});
        dispatch(updatedTestsState(test));
        dispatch(clearTest());
        dispatch(actionSuccess());
      })
      .catch((err) => console.log(err));
  };
};

export const getTestById = (idTest) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .get(`https://localhost:44356/api/Test/GetFullTest/${idTest}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch(createQuestionsToTest(res.data.test, res.data.test.question));
      })
      .catch((err) => console.log(err));
  };
};

export const setFullTest = (test, questionsList) => {
  return {
    type: actionTypes.SET_TEST_QUESTION,
    test: test,
    questions: questionsList,
  };
};

export const clearTest = () => {
  return {
    type: actionTypes.CLEAR_TEST,
  };
};

export const updatedTestsState = (test) => {
  return {
    type: actionTypes.ADD_TEST,
    data: test,
  };
};

export const addQuestion = (question) => {
  return {
    type: actionTypes.ADD_QUESTION,
    data: question,
  };
};

export const deleteQuestion = (id) => {
  return {
    type: actionTypes.DELETE_QUESTION,
    id: id,
  };
};

export const updateQuestion = (question) => {
  return {
    type: actionTypes.UPDATE_QUESTION,
    data: question,
    id: question.position,
  };
};

export const updateViewQuestion = (questionLists, id) => {
  const updatedList = questionLists.map((q) => {
    const updateObj = { ...q };
    if (updateObj.position === id) {
      updateObj.isView = true;
    } else {
      updateObj.isView = false;
    }
    return updateObj;
  });
  return {
    type: actionTypes.UPDATE_VIEW_QUESTION,
    data: updatedList,
  };
};

export const orderViewQuestion = () => {
  return {
    type: actionTypes.ORDER_VIEW_QUESTION,
  };
};

export const publishTest = (idTest, classrooms) => {
  const publish = {
    idClassrooms: classrooms,
    idTest,
  };
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .post("https://localhost:44356/api/Test/PublishTest", publish)
      .then((res) => {
        if (res.status === 403 || res.status === 400) {
          return dispatch(actionFail());
        }
        dispatch(actionSuccess());
      })
      .catch((err) => actionFail(err));
  };
};

const createQuestionsToTest = (test, questions) => {
  const questionList = questions.map((q) => {
    if (q.questionType === "option" || q.questionType === "image") {
      const question = {
        id: -1,
        option1: {
          content: "",
          id: -1,
        },
        option2: {
          content: "",
          id: -1,
        },
        option3: {
          content: "",
          id: -1,
        },
        option4: {
          content: "",
          id: -1,
        },
        content1: "",
        questionType: "",
        userAnswer1: 0,
        value: 0,
        idTest: -1,
      };
      let numberOne = Math.round(Math.random() * 4) + 1;
      let indexs = [];
      for (let i = 1; i < 5; i++) {
        if (i !== numberOne) {
          indexs.push(i);
        }
      }
      const getDistractors = q.questionOption
        .filter((o) => o.type !== 2)
        .map((v) => v.idOptionNavigation);
      const getAnswer = q.questionOption
        .filter((o) => o.type !== 1)
        .map((v) => v.idOptionNavigation);
      question["option" + indexs[0]] = getDistractors[0];
      question["option" + indexs[1]] = getDistractors[1];
      question["option" + indexs[2]] = getDistractors[2];
      question["option" + numberOne] = getAnswer[0];
      question.value = q.value;
      question.content1 = q.content1;
      question.questionType = q.questionType;
      question.imageUrl = q.imageUrl;
      question.idTest = q.idTest;
      question.id = q.id;
      return question;
    } else {
      const question = {
        id: -1,
        option1: {
          content: "",
          id: -1,
        },
        option2: {
          content: "",
          id: -1,
        },
        option3: {
          content: "",
          id: -1,
        },
        option4: {
          content: "",
          id: -1,
        },
        option5: {
          content: "",
          id: -1,
        },
        userAnswer1: 0,
        userAnswer2: 0,
        content1: "",
        content2: "",
        content3: "",
        questionType: "",
        value: 0,
        idTest: -1,
      };
      const numberOne = Math.floor(Math.random() * 5) + 1;
      let numberTwo = numberOne;
      do {
        numberTwo = Math.floor(Math.random() * 5) + 1;
      } while (numberOne === numberTwo);

      const getDistractors = q.questionOption
        .filter((o) => o.type !== 2)
        .map((v) => v.idOptionNavigation);
      const getAnswers = q.questionOption
        .filter((o) => o.type !== 1)
        .map((v) => v.idOptionNavigation);
      let indexs = [];
      for (let i = 1; i < 6; i++) {
        if (i !== numberOne && i !== numberTwo) {
          indexs.push(i);
        }
      }
      question["option" + numberOne] = getAnswers[0];
      question["option" + numberTwo] = getAnswers[1];
      question["option" + indexs[0]] = getDistractors[0];
      question["option" + indexs[1]] = getDistractors[1];
      question["option" + indexs[2]] = getDistractors[2];
      question.value = q.value;
      question.content1 = q.content1;
      question.content2 = q.content2;
      question.content3 = q.content3;
      question.questionType = q.questionType;
      question.idTest = q.idTest;
      question.id = q.id;
      return question;
    }
  });
  return (dispatch) => {
    dispatch(setFullTest(test, questionList));
  };
};

export const insertUserAnswer = (answer, multipleAnswers, question) => {
  return {
    type: actionTypes.INSERT_USER_ANSWER,
    answer,
    multipleAnswers,
    question,
  };
};

export const finishTest = (questions, idTest) => {
  const questionList = questions.map((q) => {
    return { id: q.id, userAnswer1: q.userAnswer1, userAnswer2: q.userAnswer2 };
  });
  const test = {
    id: idTest,
    questionList,
  };
  return (dispatch) => {
    const idStudent = localStorage.getItem("idUser");
    const token = localStorage.getItem("token");
    dispatch(actionStart());
    axios
      .post(`https://localhost:44356/api/Test/FinishTest/${idStudent}`, test, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === false) {
        } else {
          dispatch(setGrade(res.data.grade));
        }
        dispatch(actionSuccess());
      })
      .catch((err) => actionFail(err));
  };
};

const setGrade = (grade) => {
  return {
    type: actionTypes.FINISH_TEST,
    grade,
  };
};
