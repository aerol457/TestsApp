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
      .post(`https://localhost:44356/api/Test/${idUser}`, test, {
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
        dispatch(setFullTest(res.data.test, res.data.test.question));
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
  console.log(publish);
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .post("https://localhost:44356/api/Test", publish)
      .then((res) => {
        if (res.status === 403 || res.status === 400) {
          return dispatch(actionFail());
        }
        dispatch(actionSuccess());
      })
      .catch((err) => actionFail(err));
  };
};
