import React, { useEffect, useState } from "react";
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
  addTestDetails,
  getAllProfessions,
  updateTestDetails,
} from "../../../../../store/actions/index";

const Settings = () => {
  const [testName, setTestName] = useState("");
  const [testProfession, setTestProfession] = useState("");
  const [testTime, setTestTime] = useState(0);
  const [testDateSubmitted, setTestDateSubmitted] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);
  const [errors, setErrors] = useState([false, false, false]);

  const professions = useSelector((state) => state.general.professions);
  const test = useSelector((state) => state.test.test);
  const dispatch = useDispatch();

  const handleSubmitTestDetails = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isUpdate) {
        dispatch(
          updateTestDetails({
            name: testName,
            professionName: testProfession,
            time: +testTime,
            dateOfSubmission: testDateSubmitted,
          })
        );
      } else {
        dispatch(
          addTestDetails({
            name: testName,
            professionName: testProfession,
            time: +testTime,
            dateOfSubmission: testDateSubmitted,
            quantityOfQuestions: 0,
            grade: 0,
          })
        );
      }
    }
  };

  const validateForm = () => {
    const updateErrors = [false, false, false];
    let isValid = true;
    if (!length({ min: 1, max: 15 })(testName) || !required(testName)) {
      updateErrors[0] = true;
      isValid = false;
    }
    if (!range({ min: 10, max: 300 })(testTime)) {
      updateErrors[1] = true;
      isValid = false;
    }

    if (!validDate(testDateSubmitted) || !required(testDateSubmitted)) {
      updateErrors[2] = true;
      isValid = false;
    }

    if (isValid) {
      return true;
    }

    setErrors(updateErrors);
    return false;
  };

  useEffect(() => {
    dispatch(getAllProfessions());
  }, [getAllProfessions]);

  useEffect(() => {
    if (professions.length > 0) {
      setTestProfession(professions[0].name.toLowerCase());
    }
  }, [professions]);

  useEffect(() => {
    if (test.name) {
      console.log("update test");
      setTestName(test.name);
      setTestProfession(test.professionName);
      setTestTime(test.time);
      setTestDateSubmitted(test.dateOfSubmission);
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, []);

  return (
    <div className="settings">
      <h1>Settings:</h1>
      <form onSubmit={(e) => handleSubmitTestDetails(e)}>
        <div className="settings-attr">
          <label>Test Name:</label>
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
          <label>Test Profession:</label>
          <select
            value={testProfession}
            onChange={(e) => setTestProfession(e.target.value)}
          >
            {professions.map((p) => (
              <option key={p.id} value={p.name.toLowerCase()}>
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </option>
            ))}
          </select>
          <span></span>
        </div>
        <div className="settings-attr">
          <label>Test Time:</label>
          <input
            className={
              !errors[1]
                ? "settings-attr-input"
                : "settings-attr-input settings-attr-input-error"
            }
            type="number"
            value={testTime}
            max="300"
            onChange={(e) => setTestTime(e.target.value)}
          />
          <span>
            {errors[1] && <Error error="Time should range between 10 to 300" />}
          </span>
        </div>
        <div className="settings-attr">
          <label>Test Submission:</label>
          <input
            className={
              !errors[2]
                ? "settings-attr-input"
                : "settings-attr-input settings-attr-input-error"
            }
            type="date"
            value={testDateSubmitted}
            onChange={(e) => setTestDateSubmitted(e.target.value)}
          />
          <span>{errors[2] && <Error error="Date invalid" />}</span>
        </div>
        <div className="settings-btn">
          <Button>NEXT</Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
