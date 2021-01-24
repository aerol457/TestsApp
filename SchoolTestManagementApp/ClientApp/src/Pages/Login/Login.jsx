import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";

import Button from "../../Components/Core/Button/Button";
import { auth } from "../../store/actions/index";
import { DashboardContext } from "../../context/TeacherContext/DashboardContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dashboardContext = useContext(DashboardContext);

  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      auth({
        email: email,
        passwordHash: password,
      })
    );
    dashboardContext.viewTests();
  };

  return (
    <div className="login-content">
      <form
        className="login-modal-content-args"
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <div className="login-modal-content-argument">
          <label>E-Mail:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-modal-content-argument">
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button>LOGIN</Button>
        </div>
      </form>
    </div>
  );
};
export default Login;
