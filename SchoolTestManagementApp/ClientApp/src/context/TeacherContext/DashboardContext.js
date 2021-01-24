import React, { useEffect, useState } from "react";

export const DashboardContext = React.createContext({
  stateDashboard: "tests",
  viewTests: () => {},
  viewStudents: () => {},
  viewTestDesign: () => {},
  viewTest: () => {},
});

const DashboardContextProvider = (props) => {
  const [stateDashboard, setStateDashboard] = useState("");

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

  useEffect(() => {
    const dashboard = localStorage.getItem("dashboard");
    if (!dashboard) return handleViewTests();
    setStateDashboard(dashboard);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        stateDashboard: stateDashboard,
        viewTests: handleViewTests,
        viewTest: handleViewTest,
        viewStudents: handleViewStudents,
        viewTestDesign: handleViewDesignTest,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
