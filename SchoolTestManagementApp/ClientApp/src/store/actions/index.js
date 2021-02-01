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
  publishTest,
  initTest,
  insertUserAnswer,
  finishTest,
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
  resetError,
  authFail,
} from "./auth/auth";

export {
  getAllStudentsByIdTeacher,
  getAllTestsByIdStudent,
  clearStudentAndTests,
  clearAll,
} from "./student/student";
