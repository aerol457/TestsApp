import axios from "axios";

import * as actionTypes from "./actionTypes";

const actionStart = () => {
  return {
    type: actionTypes.ACTION_START_TEACHER_CLASS,
  };
};

const actionSuccess = () => {
  return {
    type: actionTypes.ACTION_SUCCESS_TEACHER_CLASS,
  };
};

export const actionResetAdmin = () => {
  return {
    type: actionTypes.ACTION_RESET_ADMIN,
  };
};

const actionFail = (error) => {
  return (dispatch) => {
    dispatch(setError(error));
    setTimeout(() => {
      dispatch(resetError());
    }, 2000);
  };
};

const setError = (error) => {
  return {
    type: actionTypes.ACTION_FAIL,
    error,
  };
};

const resetError = () => {
  return {
    type: actionTypes.ACTION_INIT_ERROR,
  };
};

export const getInitUserClass = (idCard, allClassrooms, type) => {
  const token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(actionStart());
    if (idCard === "") {
      return dispatch(actionFail("Must fiil search input"));
    }
    axios
      .get(
        `https://localhost:44356/api/User/GetUserAndConnectedClassrooms/${idCard}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 401) {
          return;
        }
        if (res.data.success === true && res.data.user.userType === type) {
          const classrooms = allClassrooms.map((c) => {
            let isAssign = false;
            res.data.classrooms.forEach((item) => {
              if (item.id === c.id) {
                isAssign = true;
              }
            });
            return { ...c, isAssign };
          });
          dispatch(setInitUserClass(res.data.user, classrooms));
          dispatch(actionSuccess());
        } else {
          dispatch(actionFail("Not found user"));
        }
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setInitUserClass = (user, classrooms) => {
  return {
    type: actionTypes.INTI_USER_CLASS,
    user,
    classrooms,
  };
};

export const addTeacherClass = (data) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .post("https://localhost:44356/api/TeacherClass", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === true && res.status !== 401) {
          dispatch(setTeacherClass(res.data.teacherClass));
        }
        dispatch(actionSuccess());
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setTeacherClass = (data) => {
  return {
    type: actionTypes.ADD_TEACHER_CLASS,
    data,
  };
};

export const removeTeacherClass = (data) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .post("https://localhost:44356/api/TeacherClass/Remove", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status !== 401) {
          dispatch(setRemoveTeacherClass(data));
          dispatch(actionSuccess());
        }
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setRemoveTeacherClass = (data) => {
  return {
    type: actionTypes.REMOVE_TEACHER_CLASS,
    data,
  };
};

export const updateStudentClass = (user) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .put("https://localhost:44356/api/User", user, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 401) {
          return;
        }
        if (res.data.success === true) {
          dispatch(setStudentClass(user));
          dispatch(actionSuccess());
        } else {
          dispatch(actionFail("Student not found"));
        }
      })
      .catch(() => dispatch(actionFail()));
  };
};

const setStudentClass = (user) => {
  return {
    type: actionTypes.UPDATE_STUDENT_CLASS,
    user,
  };
};
