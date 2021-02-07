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
  addTestDetails,
  getAllProfessions,
  updateTestDetails,
  clearTest,
} from "../../../../../store/actions/index";
import { TestDesignContext } from "../../../../../context/TeacherContext/TestDesignContext";

const Settings = () => {
  const [testName, setTestName] = useState("");
  const [testProfession, setTestProfession] = useState("");
  const [testTime, setTestTime] = useState(0);
  const [passingGrade, setPassingGrade] = useState(50);
  const [testDateSubmitted, setTestDateSubmitted] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);
  const [errors, setErrors] = useState([false, false, false, false]);

  const professions = useSelector((state) => state.general.professions);
  const test = useSelector((state) => state.test.test);
  const testDesignContext = useContext(TestDesignContext);
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
            passingGrade,
          })
        );
      } else {
        dispatch(
          addTestDetails({
            name: testName,
            professionName: testProfession,
            time: +testTime,
            dateOfSubmission: testDateSubmitted,
            passingGrade,
            quantityOfQuestions: 0,
            grade: 0,
          })
        );
      }
      testDesignContext.viewQuestions();
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
    setTestName("");
    setTestTime(0);
    setTestProfession(professions[0].name.toLowerCase());
    setTestDateSubmitted("");
  };

  useEffect(() => {
    dispatch(getAllProfessions());
  }, [getAllProfessions]);

  useEffect(() => {
    if (professions.length > 0 && !test.professionName) {
      setTestProfession(professions[0].name.toLowerCase());
    }
  }, [professions]);

  useEffect(() => {
    if (test.name) {
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
      <div className="settings-header">
        <h1>Settings:</h1>
        <span className="settings-reset-btn">
          <Button clicked={handleResetTest}>RESET TEST</Button>
        </span>
      </div>
      <form onSubmit={(e) => handleSubmitTestDetails(e)}>
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
          <label>Profession:</label>
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
          <label>Time:</label>
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
          <Button>NEXT</Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
