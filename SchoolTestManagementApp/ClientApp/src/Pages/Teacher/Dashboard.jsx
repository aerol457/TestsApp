import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import "./Dashboard.css";
import Profile from "../../Components/Profile/Profile";
import TestDesign from "../../Components/Tests/TestCreate/TestDesign/TestDesign";
import DesignTest from "../../Components/Tests/DesignTest/DesignTest";
import Students from "../../Components/Students/Students";
import Tests from "../../Components/Tests/Tests";
import { DashboardContext } from "../../context/TeacherContext/DashboardContext";
import Test from "../../Components/Tests/Test/Test";

const Dashboard = () => {
  const [showActions, setShowActions] = useState(false);
  const dashboardContext = useContext(DashboardContext);

  const onToggleActions = () => {
    setShowActions((prevState) => !prevState);
  };

  const handleViewTests = () => {
    dashboardContext.viewTests();
    onToggleActions();
  };

  const handleViewStudents = () => {
    dashboardContext.viewStudents();
    onToggleActions();
  };

  return (
    <div className="dashboard-content">
      {(dashboardContext.stateDashboard === "students" ||
        dashboardContext.stateDashboard === "tests") && (
        <div className="dashboard-content-left">
          <Profile />
        </div>
      )}
      <div className="dashboard-content-center">
        {dashboardContext.stateDashboard === "students" ? (
          <Students />
        ) : dashboardContext.stateDashboard === "designTest" ? (
          <DesignTest />
        ) : dashboardContext.stateDashboard === "tests" ? (
          <Tests />
        ) : dashboardContext.stateDashboard === "testView" ? (
          <div className="dashboard-content-center-test">
            <Test />
          </div>
        ) : null}
      </div>
      {(dashboardContext.stateDashboard === "students" ||
        dashboardContext.stateDashboard === "tests") && (
        <div
          className={
            showActions
              ? "dashboard-content-right show-dashboard-content-right"
              : "dashboard-content-right"
          }
        >
          <span className="toggle-left" onClick={() => onToggleActions()}>
            <AiOutlineArrowLeft
              className={
                showActions
                  ? "toggle-left-content show-toggle-left-content"
                  : "toggle-left-content"
              }
            />
          </span>
          {showActions && (
            <div className="dashboard-content-right-directions">
              <ul>
                <li onClick={handleViewTests}>Tests</li>
                <li onClick={handleViewStudents}>Students</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
