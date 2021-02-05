import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./TestCreate.css";

import Button from "../../Core/Button/Button";
import Error from "../../Core/Error/Error";
import { required } from "../../../utils/validators";
import {
  addTestDetails,
  getAllProfessions,
} from "../../../store/actions/index";
import { DashboardContext } from "../../../context/TeacherContext/DashboardContext";

const TestCreate = () => {
  const [testName, setTestName] = useState("");
  const [testProfession, setTestProfession] = useState("");
  const [testTime, setTestTime] = useState(0);
  const [testDateSubmitted, setTestDateSubmitted] = useState("");
  const [validator, setValidator] = useState([false, false, false]);
  const [errors, setErrors] = useState([null, null, null]);

  const dashboardContext = useContext(DashboardContext);
  const professions = useSelector((state) => state.general.professions);
  const dispatch = useDispatch();

  const handleSubmitTestDetails = (e) => {
    e.preventDefault();
    if (validateForm()) {
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
      dashboardContext.viewTestDesign();
    }
  };

  const validateForm = () => {
    const updateValidator = [false, false, false];
    const updateErrors = [null, null, null];
    let isValid = true;
    if (testName.length > 15 || !required(testName)) {
      updateValidator[0] = true;
      updateErrors[0] = "Name too long/short";
      isValid = false;
    }
    if (testTime < 10 || testTime > 300 || !required(testTime)) {
      updateValidator[1] = true;
      updateErrors[1] = "Time should range between 10 to 300";
      isValid = false;
    }
    const currentDate = new Date();
    const submmitedDate = new Date(testDateSubmitted);
    if (currentDate >= submmitedDate || !required(testDateSubmitted)) {
      updateValidator[2] = true;
      updateErrors[2] = "Date invalid";
      isValid = false;
    }
    if (isValid) {
      return true;
    }
    setValidator(updateValidator);
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

  return (
    <form
      className="test-create-form"
      onSubmit={(e) => handleSubmitTestDetails(e)}
    >
      <input
        className={
          !validator[0]
            ? "test-create-input"
            : "test-create-input test-create-input-error"
        }
        placeholder="Test Name.."
        type="text"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
      />
      <span>{validator[0] && <Error error={errors[0]} />}</span>
      <select
        className="test-create-input "
        placeholder="Test Profession.."
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
      <input
        className={
          !validator[1]
            ? "test-create-input"
            : "test-create-input test-create-input-error"
        }
        placeholder="Time(minutes).."
        type="number"
        value={testTime}
        max="300"
        onChange={(e) => setTestTime(e.target.value)}
      />
      <span>{validator[1] && <Error error={errors[1]} />}</span>
      <input
        className={
          !validator[2]
            ? "test-create-input"
            : "test-create-input test-create-input-error"
        }
        placeholder="Date of Submitted.."
        type="date"
        value={testDateSubmitted}
        onChange={(e) => setTestDateSubmitted(e.target.value)}
      />
      <span>{validator[2] && <Error error={errors[2]} />}</span>
      <Button>CREATE TEST</Button>
    </form>
  );
};

export default TestCreate;
