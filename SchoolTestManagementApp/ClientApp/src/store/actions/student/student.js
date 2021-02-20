import axios from "axios";
import { authLogout } from "../auth/auth";

import * as actionTypes from "./actionTypes";

const actionStart = () => {
  return {
    type: actionTypes.ACTION_START_STUDENT,
  };
};

const actionSuccessStudent = () => {
  return {
    type: actionTypes.ACTION_SUCCESS_STUDENT,
  };
};

export const resetErrorStudent = () => {
  return {
    type: actionTypes.RESET_ERROR_STUDENT,
  };
};

const actionFail = (error) => {
  return {
    type: actionTypes.ACTION_FAIL_STUDENT,
    error: error,
  };
};

export const clearStudentAndTests = () => {
  return {
    type: actionTypes.CLEAR_TESTS_STUDENT,
  };
};

export const clearAll = () => {
  return {
    type: actionTypes.INIT_STUDENT,
  };
};

export const getAllStudentsByIdTeacher = () => {
  const idTeacher = localStorage.getItem("idUser");
  const token = localStorage.getItem("token");
  return (dispatch) => {
    if (!idTeacher || !token) {
      dispatch(authLogout);
    } else {
      dispatch(actionStart());
      axios
        .get(
          `https://localhost:44356/api/TeacherClass/GetStudents/${idTeacher}`,
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then((res) => {
          dispatch(setStudents(res.data.students));
          dispatch(actionSuccessStudent());
        })
        .catch((err) => actionFail(err));
    }
  };
};

const setStudents = (students) => {
  return {
    type: actionTypes.GET_ALL_STUDENTS,
    students,
  };
};

export const getAllTestsByIdStudent = (student, userType) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    if (!token) {
      return dispatch(authLogout());
    }
    dispatch(actionStart());
    axios
      .get(`https://localhost:44356/api/StudentTest/GetTests/${student.id}`, {
        params: {
          userType,
        },
      })
      .then((res) => {
        if (res.data.success === false) {
          return dispatch(actionFail());
        }
        dispatch(setTests(res.data.tests, student));
        dispatch(actionSuccessStudent());
      })
      .catch((err) => actionFail(err));
  };
};

const setTests = (tests, student) => {
  return {
    type: actionTypes.GET_ALL_STUDENT_TESTS,
    tests,
    student,
  };
};

export const searchStudent = (idCard) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    if (idCard === "") {
      dispatch(getAllStudentsByIdTeacher());
      dispatch(actionFail("Can't find student"));
    } else {
      dispatch(actionStart());
      axios
        .get(`https://localhost:44356/api/User/GetStudent/${idCard}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data.success == "false") {
            dispatch(getAllStudentsByIdTeacher());
            dispatch(actionFail("Can't find student"));
          } else {
            dispatch(setStudents([res.data.student]));
          }
          dispatch(actionSuccessStudent());
        })
        .catch(() => dispatch(actionFail()));
    }
  };
};
