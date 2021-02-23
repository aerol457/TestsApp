import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";

import "./Dashboard.css";
import Profile from "../../Components/Profile/Profile";
import DesignTest from "../../Components/Tests/DesignTest/DesignTest";
import Students from "../../Components/Students/Students";
import General from "../../Components/Admin/General/General";
import User from "../../Components/Admin/User/User";
import Tests from "../../Components/Tests/Tests";
import { DashboardContext } from "../../context/DashboardContext";
import Test from "../../Components/Tests/Test/Test";
import { actionResetAdmin } from "../../store/actions/index";

const Dashboard = () => {
  const [showActions, setShowActions] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const userDetails = useSelector((state) => state.auth.userProfile);
  const dashboardContext = useContext(DashboardContext);
  const dispatch = useDispatch();

  const onToggleActions = () => {
    setShowActions((prevState) => !prevState);
  };

  const handleViewActions = (dashboard) => {
    switch (dashboard) {
      case "tests":
        dashboardContext.viewTests();
        break;
      case "students":
        dashboardContext.viewStudents();
        break;
      case "general":
        dashboardContext.viewGeneral();
        break;
      case "teacher":
        dashboardContext.viewTeacher();
        dispatch(actionResetAdmin());
        break;
      case "student":
        dashboardContext.viewStudent();
        dispatch(actionResetAdmin());
        break;
    }
    onToggleActions();
  };

  useEffect(() => {
    if (userDetails.userType === "teacher") {
      dashboardContext.viewTests();
    } else if (userDetails.userType === "admin") {
      dashboardContext.viewGeneral();
    }
  }, [userDetails]);

  useEffect(() => {
    if (
      dashboardContext.stateDashboard === "teacher" ||
      dashboardContext.stateDashboard === "student"
    ) {
      setShowSub(true);
    } else {
      setShowSub(false);
    }
  }, [dashboardContext.stateDashboard]);

  return (
    <div className="dashboard-content">
      {dashboardContext.stateDashboard !== "testView" && (
        <div className="dashboard-content-left">
          <Profile />
        </div>
      )}
      {userDetails.userType === "teacher" ? (
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
      ) : null}
      {userDetails.userType === "admin" ? (
        <div className="dashboard-layout-center">
          <div className="dashboard-content-center">
            {dashboardContext.stateDashboard === "general" ? (
              <General />
            ) : dashboardContext.stateDashboard === "teacher" ||
              dashboardContext.stateDashboard === "student" ? (
              <User />
            ) : null}
          </div>
        </div>
      ) : null}
      {(dashboardContext.stateDashboard !== "testView" ||
        userDetails.userType !== "student") && (
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
              {userDetails.userType === "teacher" ? (
                <ul>
                  <li
                    className={
                      dashboardContext.stateDashboard === "tests"
                        ? "directions-active"
                        : null
                    }
                    onClick={() => handleViewActions("tests")}
                  >
                    Tests
                  </li>
                  <li
                    className={
                      dashboardContext.stateDashboard === "students"
                        ? "directions-active"
                        : null
                    }
                    onClick={() => handleViewActions("students")}
                  >
                    Students
                  </li>
                </ul>
              ) : (
                <ul>
                  <li
                    className={
                      dashboardContext.stateDashboard === "general"
                        ? "directions-active"
                        : null
                    }
                    onClick={() => handleViewActions("general")}
                  >
                    General
                  </li>
                  <li onClick={() => setShowSub((prevState) => !prevState)}>
                    Users
                  </li>
                  <div
                    className={
                      showSub
                        ? "users-subgroup"
                        : "users-subgroup users-subgroup-hide"
                    }
                  >
                    <li
                      className={
                        dashboardContext.stateDashboard === "teacher"
                          ? "directions-active"
                          : null
                      }
                      onClick={() => handleViewActions("teacher")}
                    >
                      Teachers
                    </li>
                    <li
                      className={
                        dashboardContext.stateDashboard === "student"
                          ? "directions-active"
                          : null
                      }
                      onClick={() => handleViewActions("student")}
                    >
                      Students
                    </li>
                  </div>
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
