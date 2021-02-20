import axios from "axios";
import { resetTest, initGeneral, clearAll } from "../index";

import * as actionTypes from "./actionTypes";

const actionStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const actionAuthSuccess = () => {
  return {
    type: actionTypes.ACTION_SUCCESS,
  };
};

export const authFail = (error = null) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

const authSuccess = (token, idUser) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    idUser: idUser,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (user) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .post("https://localhost:44356/api/User/Auth", user)
      .then((res) => {
        if (res.data.success === false) {
          return dispatch(authFail("E-Mail/password not corret!"));
        }
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("idUser", res.data.user.id);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(res.data.token, res.data.user.id));
        dispatch(checkAuthTimeout(res.data.expiresIn));
        dispatch(setProfileSuccess(res.data.user));
        dispatch(actionAuthSuccess());
      })
      .catch(() => dispatch(authFail()));
  };
};

export const signUp = (user) => {
  let token;
  let expiresIn;
  const formData = new FormData();
  if (user.userType === "student") {
    formData.append("idClassroom", user.idClassroom);
  } else {
    formData.append("idProfession", user.idProfession);
  }
  if (user.imageUrl !== "" && user.image !== "") {
    formData.append("imageFile", user.image, user.imageUrl);
    formData.append("imageUrl", user.imageUrl);
  }
  formData.append("name", user.name);
  formData.append("idCard", user.idCard);
  formData.append("email", user.email);
  formData.append("phoneNumber", user.phoneNumber);
  formData.append("passwordHash", user.passwordHash);
  formData.append("city", user.city);
  formData.append("address", user.address);
  formData.append("userType", user.userType);

  return (dispatch) => {
    dispatch(actionStart());
    axios
      .post("https://localhost:44356/api/User", formData)
      .then((res) => {
        if (res.data.errors) {
          return dispatch(authFail(res.data.errors));
        }
        token = res.data.token;
        expiresIn = res.data.expiresIn;
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem("token", token);
        localStorage.setItem("idUser", res.data.id);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, res.data.id));
        dispatch(setProfileSuccess(res.data.user));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch(() => dispatch(authFail()));
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("idUser");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("dashboard");
  localStorage.removeItem("testDesignDash");
  localStorage.removeItem("state");
  return (dispatch) => {
    dispatch(logout());
    dispatch(resetTest());
    dispatch(initGeneral());
    dispatch(clearAll());
  };
};

const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("idUser");
    if (!token || !idUser) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token, idUser));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const getUserProfile = () => {
  const idUser = localStorage.getItem("idUser");
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .get(`https://localhost:44356/api/User/${idUser}`)
      .then((res) => {
        dispatch(setProfileSuccess(res.data.user));
        dispatch(actionAuthSuccess());
      })
      .catch(() => dispatch(authFail()));
  };
};

const setProfileSuccess = (details) => {
  return {
    type: actionTypes.SET_USER_DETAILS,
    data: details,
  };
};

export const sendVerifyMail = (email) => {
  return (dispatch) => {
    axios
      .get("https://localhost:44356/api/User")
      .then((res) => {})
      .catch();
  };
};
