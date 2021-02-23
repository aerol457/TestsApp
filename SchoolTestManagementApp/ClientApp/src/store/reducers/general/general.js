import * as actionTypes from "../../actions/general/actionTypes";
import updateState from "../../utils/utility";

const initialState = {
  professions: [],
  profession: "",
  classroom: "",
  classrooms: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_START_GENERAL:
      return updateState(state, { loading: true, error: null });
    case actionTypes.ACTION_SUCCESS_GENERAL:
      return updateState(state, { loading: false, error: null });
    case actionTypes.INIT_GENERAL:
      return updateState(state, {
        professions: [],
        profession: "",
        classroom: "",
        classrooms: [],
      });
    case actionTypes.ACTION_FAIL_GENERAL:
      return updateState(state, { loading: false, error: action.error });
    case actionTypes.INITIAL_PROFESSION:
      return updateState(state, { professions: action.data });
    case actionTypes.GET_PROFESSION_BY_ID:
      return updateState(state, { profession: action.data });
    case actionTypes.INITIAL_CLASSROOM:
      return updateState(state, { classrooms: action.data });
    case actionTypes.GET_CLASSROOM_BY_ID:
      return updateState(state, { classroom: action.data });
    case actionTypes.ADD_PROFESSION:
      const updateAddProfessions = [...state.professions];
      updateAddProfessions.push(action.profession);
      return updateState(state, { professions: updateAddProfessions });
    case actionTypes.ADD_CLASSROOM:
      const updateAddClassrooms = [...state.classrooms];
      updateAddClassrooms.push(action.classroom);
      return updateState(state, { classrooms: updateAddClassrooms });
    default:
      return state;
  }
};
