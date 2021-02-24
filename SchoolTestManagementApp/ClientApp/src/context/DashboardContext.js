import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const DashboardContext = React.createContext({
  stateDashboard: "",
  viewTests: () => {},
  viewStudents: () => {},
  viewTestDesign: () => {},
  viewTest: () => {},
  viewProfession: () => {},
  viewClassroom: () => {},
  viewTeacher: () => {},
  viewStudent: () => {},
});

const DashboardContextProvider = (props) => {
  const [stateDashboard, setStateDashboard] = useState("");
  const isAuth = useSelector((state) => state.auth.token !== null);

  const handleViewTests = () => {
    setStateDashboard("tests");
    localStorage.setItem("dashboard", "tests");
  };

  const handleViewStudents = () => {
    setStateDashboard("students");
    localStorage.setItem("dashboard", "students");
  };

  const handleViewDesignTest = () => {
    setStateDashboard("designTest");
    localStorage.setItem("dashboard", "designTest");
  };

  const handleViewTest = () => {
    setStateDashboard("testView");
    localStorage.setItem("dashboard", "testView");
  };

  const handleViewProfession = () => {
    setStateDashboard("profession");
    localStorage.setItem("dashboard", "profession");
  };

  const handleViewClassroom = () => {
    setStateDashboard("classroom");
    localStorage.setItem("dashboard", "classroom");
  };

  const handleViewTeacher = () => {
    setStateDashboard("teacher");
    localStorage.setItem("dashboard", "teacher");
  };

  const handleViewStudent = () => {
    setStateDashboard("student");
    localStorage.setItem("dashboard", "student");
  };

  useEffect(() => {
    if (isAuth) {
      const dashboard = localStorage.getItem("dashboard");
      if (!dashboard) return handleViewTests();
      setStateDashboard(dashboard);
    }
  }, [isAuth]);

  return (
    <DashboardContext.Provider
      value={{
        stateDashboard: stateDashboard,
        viewTests: handleViewTests,
        viewTest: handleViewTest,
        viewStudents: handleViewStudents,
        viewTestDesign: handleViewDesignTest,
        viewProfession: handleViewProfession,
        viewClassroom: handleViewClassroom,
        viewTeacher: handleViewTeacher,
        viewStudent: handleViewStudent,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
