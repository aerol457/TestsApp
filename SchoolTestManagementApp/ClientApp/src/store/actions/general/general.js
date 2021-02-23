import axios from "axios";
import * as actionTypes from "../../actions/general/actionTypes";
import { authLogout } from "../index";

export const actionStart = () => {
  return {
    type: actionTypes.ACTION_START_GENERAL,
  };
};

export const actionSuccess = () => {
  return {
    type: actionTypes.ACTION_SUCCESS_GENERAL,
  };
};

export const initGeneral = () => {
  return {
    type: actionTypes.INIT_GENERAL,
  };
};

export const actionFail = (error) => {
  return {
    type: actionTypes.ACTION_FAIL_GENERAL,
    error: error,
  };
};

export const fetchInitialProfession = (professions) => {
  return {
    type: actionTypes.INITIAL_PROFESSION,
    data: professions,
  };
};

export const getAllProfessions = () => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .get("https://localhost:44356/api/profession")
      .then((resData) => {
        dispatch(fetchInitialProfession(resData.data.professions));
        dispatch(actionSuccess());
      })
      .catch((err) => dispatch(actionFail(err.message)));
  };
};

export const getProfessionById = (idProfession) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .get(`https://localhost:44356/api/profession/${idProfession}`)
      .then((resData) => {
        dispatch(setProfession(resData.data.profession.name));
        dispatch(actionSuccess());
      })
      .catch((err) => dispatch(actionFail(err.message)));
  };
};

export const setProfession = (profession) => {
  return {
    type: actionTypes.GET_PROFESSION_BY_ID,
    data: profession,
  };
};

export const fetchInitialClassrooms = (classes) => {
  return {
    type: actionTypes.INITIAL_CLASSROOM,
    data: classes,
  };
};

export const getAllClassrooms = () => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .get("https://localhost:44356/api/Class")
      .then((resData) => {
        dispatch(fetchInitialClassrooms(resData.data.classrooms));
        dispatch(actionSuccess());
      })
      .catch((err) => dispatch(actionFail(err.message)));
  };
};

export const getClassroomById = (idClass) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios
      .get(`https://localhost:44356/api/Class/${idClass}`)
      .then((resData) => {
        dispatch(setClassroom(resData.data.classroom.name));
        dispatch(actionSuccess());
      })
      .catch((err) => dispatch(actionFail(err.message)));
  };
};

export const setClassroom = (classroom) => {
  return {
    type: actionTypes.GET_CLASSROOM_BY_ID,
    data: classroom,
  };
};

export const addProfession = (name) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios.post("https://localhost:44356/api/Profession", name).then((res) => {
      if (res.data.success === true) {
        dispatch(setAddProfession(res.data.profession.result));
        dispatch(actionSuccess());
      } else {
        dispatch(actionFail());
      }
    });
  };
};

const setAddProfession = (profession) => {
  return {
    type: actionTypes.ADD_PROFESSION,
    profession,
  };
};

export const addClassroom = (name) => {
  return (dispatch) => {
    dispatch(actionStart());
    axios.post("https://localhost:44356/api/Class", name).then((res) => {
      if (res.data.success === true) {
        dispatch(setAddClassroom(res.data.classroom.result));
        dispatch(actionSuccess());
      } else {
        dispatch(actionFail());
      }
    });
  };
};

const setAddClassroom = (classroom) => {
  return {
    type: actionTypes.ADD_CLASSROOM,
    classroom,
  };
};
