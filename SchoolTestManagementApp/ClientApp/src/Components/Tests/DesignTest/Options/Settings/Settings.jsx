import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Settings.css";
import Button from "../../../../Core/Button/Button";
import Error from "../../../../Core/Error/Error";
import {
  required,
  length,
  range,
  validDate,
} from "../../../../../utils/validators";
import {
  addTest,
  updateTest,
  clearTest,
  initialNewTest,
} from "../../../../../store/actions/index";
import { TestDesignDashContext } from "../../../../../context/TestDesignDashContext";
import { DashboardContext } from "../../../../../context/DashboardContext";

const Settings = () => {
  const [testName, setTestName] = useState("");
  const [testTime, setTestTime] = useState(10);
  const [passingGrade, setPassingGrade] = useState(50);
  const [testDateSubmitted, setTestDateSubmitted] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);
  const [errors, setErrors] = useState([false, false, false, false]);

  const test = useSelector((state) => state.test.test);
  const testDesignDashContext = useContext(TestDesignDashContext);
  const dashboardContext = useContext(DashboardContext);
  const dispatch = useDispatch();

  const handleSubmitTestDetails = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const testDetails = {
        ...test,
        name: testName,
        time: +testTime,
        dateOfSubmission: testDateSubmitted,
        passingGrade,
      };
      if (isUpdate) {
        dispatch(updateTest(testDetails));
      } else {
        dispatch(addTest(testDetails));
      }
      testDesignDashContext.viewQuestions();
    }
  };

  const validateForm = () => {
    const updateErrors = [false, false, false, false];
    let isValid = true;
    if (!length({ min: 1, max: 15 })(testName) || !required(testName)) {
      updateErrors[0] = true;
      isValid = false;
    }
    if (!range({ min: 10, max: 300 })(testTime)) {
      updateErrors[1] = true;
      isValid = false;
    }

    if (!range({ min: 50, max: 100 })(passingGrade)) {
      updateErrors[2] = true;
      isValid = false;
    }

    if (!validDate(testDateSubmitted) || !required(testDateSubmitted)) {
      updateErrors[3] = true;
      isValid = false;
    }

    if (isValid) {
      return true;
    }

    setErrors(updateErrors);
    return false;
  };

  const handleResetTest = () => {
    dispatch(clearTest());
    dispatch(initialNewTest());
    setTestName("");
    setTestTime(0);
    setTestDateSubmitted("");
  };

  const handleCancel = () => {
    dispatch(clearTest());
    dashboardContext.viewTests();
  };

  useEffect(() => {
    if (test.name) {
      setTestName(test.name);
      setTestTime(test.time);
      setTestDateSubmitted(test.dateOfSubmission);
      setPassingGrade(test.passingGrade);
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [test]);

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings:</h1>
        <span className="settings-reset-btn">
          <Button clicked={handleResetTest}>RESET TEST</Button>
        </span>
      </div>
      <form>
        <div className="settings-attr">
          <label>Name:</label>
          <input
            className={
              !errors[0]
                ? "settings-attr-input"
                : "settings-attr-input settings-attr-input-error"
            }
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
          <span>{errors[0] && <Error error="Name too long/short" />}</span>
        </div>
        <div className="settings-attr">
          <label>Time:</label>
          <input
            className={
              !errors[1]
                ? "settings-attr-input"
                : "settings-attr-input settings-attr-input-error"
            }
            type="number"
            value={testTime}
            min="10"
            max="300"
            onChange={(e) => setTestTime(e.target.value)}
          />
          <span>
            {errors[1] && <Error error="Time should range between 10 to 300" />}
          </span>
        </div>
        <div className="settings-attr">
          <label>Passing Grade:</label>
          <input
            className={
              !errors[2]
                ? "settings-attr-input"
                : "settings-attr-input settings-attr-input-error"
            }
            type="number"
            value={passingGrade}
            max="100"
            min="50"
            onChange={(e) => setPassingGrade(e.target.value)}
          />
          <span>
            {errors[2] && (
              <Error error="Passing grade should range between 50 to 100" />
            )}
          </span>
        </div>
        <div className="settings-attr">
          <label>Submission:</label>
          <input
            className={
              !errors[3]
                ? "settings-attr-input"
                : "settings-attr-input settings-attr-input-error"
            }
            type="date"
            value={testDateSubmitted}
            onChange={(e) => setTestDateSubmitted(e.target.value)}
          />
          <span>{errors[3] && <Error error="Date invalid" />}</span>
        </div>
        <div className="settings-btn">
          <Button clicked={handleCancel}>CANCEL</Button>
          <Button clicked={handleSubmitTestDetails}>NEXT</Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
