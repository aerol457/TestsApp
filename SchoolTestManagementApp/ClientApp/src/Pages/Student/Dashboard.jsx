import React, { useContext } from "react";

import "./Dashboard.css";
import Profile from "../../Components/Profile/Profile";
import Tests from "../../Components/Tests/Tests";
import Test from "../../Components/Tests/Test/Test";
import { DashboardContext } from "../../context/TeacherContext/DashboardContext";

const Dashboard = () => {
  const dashboardContext = useContext(DashboardContext);

  return (
    <div className="dashboard-content">
      {dashboardContext.stateDashboard === "testView" ? (
        <Test />
      ) : (
        <>
          <div className="dashboard-content-left">
            <Profile />
          </div>
          <div className="dashboard-content-center">
            {dashboardContext.stateDashboard === "tests" && <Tests />}
          </div>
        </>
      )}
    </div>
  );
};
export default Dashboard;
