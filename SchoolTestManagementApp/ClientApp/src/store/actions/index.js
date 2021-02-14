export {
  getAllTest,
  findMyTests,
  addQuestion,
  updateQuestion,
  updateViewQuestion,
  orderViewQuestion,
  deleteQuestion,
  addTest,
  clearTest,
  getTestById,
  initTest,
  insertUserAnswer,
  finishTest,
  resetErrorTest,
  setTestDetails,
  insertTestClassrooms,
  initialNewTest,
  startTest,
} from "./test/test";

export {
  getAllProfessions,
  getProfessionById,
  getClassroomById,
  getAllClassrooms,
  initGeneral,
} from "./general/general";
export {
  auth,
  authLogout,
  signUp,
  authCheckState,
  getUserProfile,
  actionAuthSuccess,
  authFail,
} from "./auth/auth";

export {
  getAllStudentsByIdTeacher,
  getAllTestsByIdStudent,
  clearStudentAndTests,
  clearAll,
  searchStudent,
  resetErrorStudent,
} from "./student/student";
