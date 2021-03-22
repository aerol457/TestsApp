import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

import Button from "../../../Components/Core/Button/Button";
import Spinner from "../../../Components/Core/Spinner/Spinner";
import {
  auth,
  actionAuthSuccess,
  authFail,
  initGeneral,
} from "../../../store/actions/index";
import {
  required,
  emailValidate,
  passwordValidate,
} from "../../../utils/validators";

const Login = ({ stateAuth, updateState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateInputs, setValidateInputs] = useState([false, false]);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    updateState("login");
    const isValid = validateForm();
    if (isValid) {
      dispatch(
        auth({
          email: email,
          passwordHash: password,
        })
      );
      dispatch(initGeneral());
    }
  };

  const validateForm = () => {
    let isValid = true;
    const validators = [false, false];
    if (!emailValidate(email) || !required(email)) {
      validators[0] = true;
      isValid = false;
    }
    if (!passwordValidate(password) || !required(password)) {
      validators[1] = true;
      isValid = false;
    }
    setValidateInputs(validators);
    if (!isValid) {
      dispatch(authFail("Error: Invalid user inputs"));
      return false;
    }
    return true;
  };

  useEffect(() => {
    let timer;
    if (error && stateAuth !== "signup") {
      timer = setTimeout(() => {
        dispatch(actionAuthSuccess());
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [error, actionAuthSuccess]);

  return (
    <div className="login-content">
      <div className="login-title">
        <h5>Login to our site</h5>
        <p>Enter a username and password to log on: </p>
      </div>
      <div className="login-form">
        <form onSubmit={(e) => handleSubmitForm(e)}>
          <div className="login-error">
            {error && stateAuth !== "signup" && <p>{error}</p>}
          </div>
          <input
            className={
              validateInputs[0]
                ? "login-form-input login-form-input-error"
                : "login-form-input"
            }
            placeholder="E-Mail.."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={
              validateInputs[1]
                ? "login-form-input login-form-input-error"
                : "login-form-input"
            }
            placeholder="Password.."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-submit-btn">
            {loading && stateAuth !== "signup" ? (
              <Spinner />
            ) : (
              <Button>SIGN IN!</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
