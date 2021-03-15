import React, { useState } from "react";
import axios from "axios";

import "./Auth.css";
import Login from "./Login/Login";
import SignUp from "../../Components/Core/UserForm/UserForm";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

const Auth = () => {
  const [stateAuth, setStateAuth] = useState("");
  const handleUpdateState = (idAuth) => {
    setStateAuth(idAuth);
  };

  return (
    <div className="home-container">
      <div className="home-auth">
        <div className="login-side">
          <Login stateAuth={stateAuth} updateState={handleUpdateState} />
        </div>
        <div className="home-border"></div>
        <div className="signup-side">
          <SignUp stateAuth={stateAuth} updateState={handleUpdateState} />
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler(Auth, axios);
