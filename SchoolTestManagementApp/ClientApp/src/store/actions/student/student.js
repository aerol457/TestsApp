import axios from "axios";
import { authLogout } from "../auth/auth";

import * as actionTypes from "./actionTypes";

const actionStart = () => {
  return {
    type: actionTypes.ACTION_START_STUDENT,
  };
};

const actionSuccess = () => {
  return {
    type: actionTypes.ACTION_SUCCESS_STUDENT,
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
          dispatch(actionSuccess());
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

export const getAllTestsByIdStudent = (student) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    if (!token) {
      return dispatch(authLogout());
    }
    dispatch(actionStart());
    axios
      .get(
        `https://localhost:44356/api/StudentTest/allStudentTests/${student.id}`
      )
      .then((res) => {
        dispatch(setTests(res.data.tests, student));
        dispatch(actionSuccess());
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
