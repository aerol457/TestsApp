import React, { useContext } from "react";
import { useSelector } from "react-redux";

import "./Settings.css";
import UserForm from "../../Core/UserForm/UserForm";
import Button from "../../Core/Button/Button";
import { DashboardContext } from "../../../context/DashboardContext";

const Settings = () => {
  const isAuth = useSelector((state) => state.auth.token !== null);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const dashboardContext = useContext(DashboardContext);

  return (
    <div className="user-settings">
      <div className="user-settings-content">
        <h1>Settings:</h1>
        <div className="user-settings-form">
          <UserForm isLogin={isAuth} />
        </div>
        {userProfile.userType === "student" && (
          <div className="btn-back-tests">
            <Button clicked={dashboardContext.viewTests}>BACK</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
