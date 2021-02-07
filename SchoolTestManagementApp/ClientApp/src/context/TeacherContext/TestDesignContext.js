import React, { useEffect, useState } from "react";

export const TestDesignContext = React.createContext({
  stateDashboard: "settings",
  viewSettings: () => {},
  viewQuestions: () => {},
  viewPublish: () => {},
});

const TestDesignProvider = (props) => {
  const [stateDashboard, setStateDashboard] = useState("");

  const handleViewSettings = () => {
    setStateDashboard("settings");
    localStorage.setItem("testDesign", "settings");
  };

  const handleViewQuestions = () => {
    setStateDashboard("questions");
    localStorage.setItem("testDesign", "questions");
  };

  const handleViewPublish = () => {
    setStateDashboard("publish");
    localStorage.setItem("testDesign", "publish");
  };

  useEffect(() => {
    const dashboard = localStorage.getItem("testDesign");
    if (!dashboard) return handleViewSettings();
    setStateDashboard(dashboard);
  }, []);

  return (
    <TestDesignContext.Provider
      value={{
        stateDashboard: stateDashboard,
        viewSettings: handleViewSettings,
        viewQuestions: handleViewQuestions,
        viewPublish: handleViewPublish,
      }}
    >
      {props.children}
    </TestDesignContext.Provider>
  );
};

export default TestDesignProvider;
