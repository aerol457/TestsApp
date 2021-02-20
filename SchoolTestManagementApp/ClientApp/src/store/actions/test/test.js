import axios from "axios";
import * as actionTypes from "../../actions/test/actionsTypes";

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

export const resetTest = () => {
  return {
    type: actionTypes.RESET_TEST,
  };
};

const actionFail = (error) => {
  return {
    type: actionTypes.ACTION_FAIL_TEST,
    error: error,
  };
};

export const initialSearchTest = () => {
  return {
    type: actionTypes.INITIAL_SEARCH_TEST,
  };
};

export const clearTest = () => {
  return {
    type: actionTypes.CLEAR_TEST,
  };
};

export const clearTests = () => {
  return {
    type: actionTypes.CLEAR_TESTS,
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
          setInitTest({
            quantityOfQuestions: 0,
            grade: 0,
            professionName: res.data.profession.name.toLowerCase(),
          })
        );
        const classrooms = res.data.classrooms.map((c) => {
          return { ...c, isAssign: false };
        });
        dispatch(setClassrooms(classrooms));
        dispatch(clearTests());
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setInitTest = (test) => {
  return {
    type: actionTypes.INIT_TEST,
    test,
  };
};

export const addTest = (test) => {
  return (dispatch) => {
    const idUser = localStorage.getItem("idUser");
    const token = localStorage.getItem("token");
    dispatch(actionStart());
    test.idUser = idUser;
    axios
      .post("https://localhost:44356/api/Test", test, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          dispatch(setAddTest(res.data.test));
          dispatch(actionTestSuccess());
        }
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setAddTest = (test) => {
  return {
    type: actionTypes.ADD_TEST,
    test,
  };
};

export const updateTest = (test) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(actionStart());
    axios
      .put("https://localhost:44356/api/Test", test, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        dispatch(setUpdateTest(test));
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

export const updateTestQuantity = (test) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(actionStart());
    axios
      .put(
        `https://localhost:44356/api/Test/UpdateQuantityOfQuestions/${test.id}`,
        test,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        dispatch(setUpdateTest(test));
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setUpdateTest = (test) => {
  return {
    type: actionTypes.UPDATE_TEST,
    test,
  };
};

export const addQuestion = (question) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .post("https://localhost:44356/api/Question", question)
      .then((res) => {
        if (res.data.success === true) {
          dispatch(setAddQuestion(res.data.question));
          dispatch(actionTestSuccess());
        }
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setAddQuestion = (question) => {
  return {
    type: actionTypes.ADD_QUESTION,
    question,
  };
};

export const updateQuestion = (question, index) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .put("https://localhost:44356/api/Question", question)
      .then(() => {
        const type = question.get("questionType");
        let updateQuestion = {
          id: question.get("id"),
          content1: question.get("content1"),
          content2: question.get("content2"),
          content3: question.get("content3"),
          answer1: question.get("answer1"),
          option1: question.get("option1"),
          option2: question.get("option2"),
          option3: question.get("option3"),
          value: +question.get("value"),
          questionType: type,
          idTest: question.get("idTest"),
        };

        if (type === "check" || type === "blank") {
          updateQuestion.answer2 = question.get("answer2");
        }

        if (type === "image") {
          updateQuestion.imageUrl = question.get("imageUrl");
        }

        dispatch(setUpdateQuestion(updateQuestion, index));
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setUpdateQuestion = (question, index) => {
  return {
    type: actionTypes.UPDATE_QUESTION,
    question,
    index,
  };
};

export const deleteQuestion = (id, index) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .delete(`https://localhost:44356/api/Question/${id}`)
      .then((res) => {
        if (res.data.success === true) {
          dispatch(setDeleteQuestion(index));
          dispatch(actionTestSuccess());
        }
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setDeleteQuestion = (index) => {
  return {
    type: actionTypes.DELETE_QUESTION,
    index,
  };
};

export const updateTests = (test) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(actionStart());
    axios
      .put("https://localhost:44356/api/Test", test, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        dispatch(setUpdateTests(test));
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setUpdateTests = (test) => {
  return {
    type: actionTypes.UPDATE_TESTS,
    test,
  };
};

export const publishClassrooms = (classrooms, idTest) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    axios
      .post(`https://localhost:44356/api/StudentTest/${idTest}`, classrooms, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch(() => dispatch(actionFail()));
  };
};

export const setClassrooms = (classrooms) => {
  return {
    type: actionTypes.SET_CLASSROOMS,
    classrooms,
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
  return {
    type: actionTypes.FINISH_TEST,
    grade,
    test,
  };
};

export const archiveTest = (idTest) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .put(`https://localhost:44356/api/Test/TestToArchive/${idTest}`)
      .then(() => {
        dispatch(setArchiveTest(idTest));
        dispatch(actionTestSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setArchiveTest = (idTest) => {
  return {
    type: actionTypes.ARCHIVE_TEST,
    idTest,
  };
};
