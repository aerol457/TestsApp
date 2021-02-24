export {
  initialNewTest,
  resetTest,
  clearTests,
  clearTest,
  addTest,
  updateTest,
  updateTests,
  updateTestQuantity,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setClassrooms,
  getAllTest,
  findMyTests,
  getTestById,
  startTest,
  insertUserAnswer,
  finishTest,
  resetErrorTest,
  publishClassrooms,
  archiveTest,
} from "./test/test";

export {
  getAllProfessions,
  getProfessionById,
  getClassroomById,
  getAllClassrooms,
  initGeneral,
  addClassroom,
  addProfession,
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

export {
  getInitUserClass,
  addTeacherClass,
  removeTeacherClass,
  actionResetAdmin,
  updateStudentClass,
} from "./admin/admin";
