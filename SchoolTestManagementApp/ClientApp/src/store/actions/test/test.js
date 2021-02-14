import axios from "axios";
import * as actionTypes from "../../actions/test/actionsTypes";
import { authLogout } from "../index";

const actionStart = () => {
  return {
    type: actionTypes.ACTION_START_TEST,
  };
};

export const actionTestSuccess = () => {
  return {
    type: actionTypes.ACTION_SUCCESS_TEST,
  };
};
export const resetErrorTest = () => {
  return {
    type: actionTypes.RESET_ERROR_TEST,
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

export const getAllTest = ({ userType, id }) => {
  const token = localStorage.getItem("token");
  let url = `https://localhost:44356/api/Test/all-tests/${id}`;
  if (userType === "student") {
    url = `https://localhost:44356/api/StudentTest/GetTests/${id}`;
  }
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch(setTests(res.data.tests));
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setTests = (tests) => {
  return {
    type: actionTypes.SET_TESTS,
    tests,
  };
};

export const findMyTests = (searchInput, user) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    if (searchInput === "") {
      dispatch(getAllTest(user));
      dispatch(actionFail("Can't find Test"));
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
            dispatch(getAllTest(user));
            dispatch(actionFail("Can't find Test"));
          } else {
            dispatch(setTests([res.data.test]));
          }
          dispatch(actionTestSuccess());
        })
        .catch(() => dispatch(actionFail()));
    }
  };
};

export const initialSearchTest = () => {
  return {
    type: actionTypes.INITIAL_SEARCH_TEST,
  };
};

export const setTestDetails = (test) => {
  return {
    type: actionTypes.SET_TEST_DETAILS,
    test,
  };
};

export const addTest = (test, files) => {
  const formData = new FormData();
  files.map((f) => {
    // formData.append("images", f.imageFile, f.imageUrl);
    formData.append("images", f.imageFile);
  });
  test = {
    ...test,
    Images: formData,
  };
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
        // axios
        //   .post(
        //     "https://localhost:44356/api/Test/CreateQuestionImages",
        //     formData
        //   )
        //   .then((res) => {});
        dispatch(updatedTestsState(test));
        dispatch(clearTest());
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
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
        if (res.data.success === true) {
          const classrooms = res.data.classrooms.map((c) => {
            let isAssign = false;
            res.data.assignClassrooms.forEach((cId) => {
              if (cId === c.id) {
                isAssign = true;
              }
            });
            return { ...c, isAssign };
          });
          dispatch(
            setFullTest(res.data.test, res.data.test.question, classrooms)
          );
        }
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

export const setFullTest = (test, questions, classrooms) => {
  return {
    type: actionTypes.SET_FULL_TEST,
    test,
    questions,
    classrooms,
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
    question,
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

export const startTest = (idTest) => {
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
        if (res.data.success === true) {
          dispatch(
            createQuestionsToTest(res.data.test, res.data.test.question)
          );
        }
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const createQuestionsToTest = (test, questions) => {
  const questionList = questions.map((q) => {
    let question = {
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
    if (q.questionType === "option" || q.questionType === "image") {
      let numberOne = Math.floor(Math.random() * 4) + 1;
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
      question.imageUrl = q.imageUrl;
    } else {
      question = {
        ...question,
        option5: {
          content: "",
          id: -1,
        },
        userAnswer2: 0,
        content2: "",
        content3: "",
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
      question.content2 = q.content2;
      question.content3 = q.content3;
    }
    question.id = q.id;
    question.content1 = q.content1;
    question.questionType = q.questionType;
    question.idTest = q.idTest;
    question.value = q.value;
    return question;
  });
  test.question = null;
  return (dispatch) => {
    dispatch(setFullTest(test, questionList));
  };
};

export const insertUserAnswer = (answer, multipleAnswers, index) => {
  return {
    type: actionTypes.INSERT_USER_ANSWER,
    answer,
    multipleAnswers,
    index,
  };
};

export const finishTest = (questions, testDetails) => {
  const questionList = questions.map((q) => {
    return { id: q.id, userAnswer1: q.userAnswer1, userAnswer2: q.userAnswer2 };
  });
  const test = {
    Id: testDetails.id,
    PassingGrade: testDetails.passingGrade,
    QuestionList: questionList,
  };

  return (dispatch) => {
    const idStudent = localStorage.getItem("idUser");
    const token = localStorage.getItem("token");
    dispatch(actionStart());
    axios
      .post(`https://localhost:44356/api/Test/CheckTest/${idStudent}`, test, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          dispatch(setGrade(res.data.grade, testDetails));
        }
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setGrade = (grade, test) => {
  console.log(grade, test);
  return {
    type: actionTypes.FINISH_TEST,
    grade,
    test,
  };
};

export const initialNewTest = () => {
  const idUser = localStorage.getItem("idUser");
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .get(`https://localhost:44356/api/Test/GetInitialTest/${idUser}`)
      .then((res) => {
        dispatch(
          setTestDetails({
            professionName: res.data.profession.name.toLowerCase(),
          })
        );
        const classrooms = res.data.classrooms.map((c) => {
          return { ...c, isAssign: false };
        });
        dispatch(insertTestClassrooms(classrooms));
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

export const insertTestClassrooms = (classrooms) => {
  return {
    type: actionTypes.ADD_TEST_CLASSROOMS,
    classrooms,
  };
};
