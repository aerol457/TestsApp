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
import Backdrop from "../../Components/Core/Backdrop/Backdrop";

const Dashboard = () => {
  const [showActions, setShowActions] = useState(false);
  const [showSubUsers, setShowSubUsers] = useState(false);
  const [showSubGeneral, setShowSubGeneral] = useState(false);
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
      case "profession":
        dashboardContext.viewProfession();
        break;
      case "classroom":
        dashboardContext.viewClassroom();
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
    if (
      userDetails.userType === "teacher" ||
      userDetails.userType === "student"
    ) {
      if (dashboardContext.stateDashboard !== "") {
        switch (dashboardContext.stateDashboard) {
          case "tests":
            dashboardContext.viewTests();
            break;
          case "students":
            dashboardContext.viewStudents();
            break;
          case "designTest":
            dashboardContext.viewTestDesign();
            break;
          default:
            dashboardContext.viewTest();
        }
      }
    } else if (userDetails.userType === "admin") {
      if (dashboardContext.stateDashboard !== "") {
        switch (dashboardContext.stateDashboard) {
          case "profession":
            setShowSubGeneral(true);
            dashboardContext.viewProfession();
            break;
          case "classroom":
            setShowSubGeneral(true);
            dashboardContext.viewClassroom();
            break;
          case "student":
            setShowSubUsers(true);
            dashboardContext.viewStudent();
            break;
          default:
            setShowSubUsers(true);
            dashboardContext.viewTeacher();
        }
      }
    }
  }, [userDetails, dashboardContext.stateDashboard]);

  return (
    <div className="dashboard-content">
      {(dashboardContext.stateDashboard === "tests" ||
        dashboardContext.stateDashboard === "student" ||
        dashboardContext.stateDashboard === "students" ||
        dashboardContext.stateDashboard === "teacher" ||
        dashboardContext.stateDashboard === "classroom" ||
        dashboardContext.stateDashboard === "profession") && (
        <div className="dashboard-content-left">
          <Profile />
        </div>
      )}
      {userDetails.userType === "teacher" ||
      userDetails.userType === "student" ? (
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
            {dashboardContext.stateDashboard === "profession" ||
            dashboardContext.stateDashboard === "classroom" ? (
              <General />
            ) : dashboardContext.stateDashboard === "teacher" ||
              dashboardContext.stateDashboard === "student" ? (
              <User />
            ) : null}
          </div>
        </div>
      ) : null}
      {(dashboardContext.stateDashboard === "tests" ||
        dashboardContext.stateDashboard === "student" ||
        dashboardContext.stateDashboard === "students" ||
        dashboardContext.stateDashboard === "teacher" ||
        dashboardContext.stateDashboard === "classroom" ||
        dashboardContext.stateDashboard === "profession") &&
        userDetails.userType !== "student" && (
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
              <>
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
                        onClick={() =>
                          setShowSubGeneral((prevState) => !prevState)
                        }
                      >
                        General
                      </li>
                      <div
                        className={
                          showSubGeneral ? "subgroup" : "subgroup subgroup-hide"
                        }
                      >
                        <li
                          className={
                            dashboardContext.stateDashboard === "classroom"
                              ? "directions-active"
                              : null
                          }
                          onClick={() => handleViewActions("classroom")}
                        >
                          Classrooms
                        </li>
                        <li
                          className={
                            dashboardContext.stateDashboard === "profession"
                              ? "directions-active"
                              : null
                          }
                          onClick={() => handleViewActions("profession")}
                        >
                          Professions
                        </li>
                      </div>
                      <li
                        onClick={() =>
                          setShowSubUsers((prevState) => !prevState)
                        }
                      >
                        Users
                      </li>
                      <div
                        className={
                          showSubUsers ? "subgroup" : "subgroup subgroup-hide"
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
              </>
            )}
          </div>
        )}
      {showActions && <Backdrop clicked={onToggleActions} />}
    </div>
  );
};
export default Dashboard;
