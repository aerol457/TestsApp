export {
  getAllTest,
  findMyTests,
  addTestDetails,
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
  updateTestDetails,
} from "./test/test";

export {
  getAllProfessions,
  getProfessionById,
  getClassroomById,
  getAllClassrooms,
  getClassroomByIdTeacher,
  getClassroomForPublishTest,
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
