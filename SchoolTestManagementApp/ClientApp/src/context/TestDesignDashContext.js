import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const TestDesignDashContext = React.createContext({
  stateDashboard: "settings",
  viewSettings: () => {},
  viewQuestions: () => {},
  viewPublish: () => {},
  viewOverview: () => {},
});

const TestDesignDashContextProvider = (props) => {
  const [stateDashboard, setStateDashboard] = useState("");
  const isAuth = useSelector((state) => state.auth.token !== null);

  const handleViewSettings = () => {
    setStateDashboard("settings");
    localStorage.setItem("testDesignDash", "settings");
  };

  const handleViewQuestions = () => {
    setStateDashboard("questions");
    localStorage.setItem("testDesignDash", "questions");
  };

  const handleViewPublish = () => {
    setStateDashboard("publish");
    localStorage.setItem("testDesignDash", "publish");
  };

  const handleOverview = () => {
    setStateDashboard("overview");
    localStorage.setItem("testDesignDash", "overview");
  };

  useEffect(() => {
    if (isAuth) {
      const dashboard = localStorage.getItem("testDesignDash");
      if (!dashboard) return handleViewSettings();
      setStateDashboard(dashboard);
    }
  }, [isAuth]);

  return (
    <TestDesignDashContext.Provider
      value={{
        stateDashboard: stateDashboard,
        viewSettings: handleViewSettings,
        viewQuestions: handleViewQuestions,
        viewPublish: handleViewPublish,
        viewOverview: handleOverview,
      }}
    >
      {props.children}
    </TestDesignDashContext.Provider>
  );
};

export default TestDesignDashContextProvider;
