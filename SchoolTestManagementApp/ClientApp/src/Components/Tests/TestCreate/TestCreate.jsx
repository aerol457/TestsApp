import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./TestCreate.css";

import Button from "../../Core/Button/Button";
import {
  addTestDetails,
  getAllProfessions,
} from "../../../store/actions/index";
import { ModalContext } from "../../../context/TeacherContext/ModalContext";
import { DashboardContext } from "../../../context/TeacherContext/DashboardContext";

const TestCreate = () => {
  const [testName, setTestName] = useState("");
  const [testProfession, setTestProfession] = useState("math");
  const [testTime, setTestTime] = useState(0);
  const [testDateSubmitted, setTestDateSubmitted] = useState("");

  const modalContext = useContext(ModalContext);
  const dashboardContext = useContext(DashboardContext);
  const professions = useSelector((state) => state.general.professions);
  const dispatch = useDispatch();

  const handleSubmitTestDetails = (e) => {
    e.preventDefault();
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
    modalContext.cancel();
    dashboardContext.viewTestDesign();
  };

  useEffect(() => {
    dispatch(getAllProfessions());
  }, [getAllProfessions]);

  return (
    <div className="test-create-layout">
      <form
        className="test-create-form"
        onSubmit={(e) => handleSubmitTestDetails(e)}
      >
        <label>Test Name:</label>
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
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
        <label>Time(minutes):</label>
        <input
          type="number"
          value={testTime}
          onChange={(e) => setTestTime(e.target.value)}
        />
        <label>Date of Submitted:</label>
        <input
          type="date"
          value={testDateSubmitted}
          onChange={(e) => setTestDateSubmitted(e.target.value)}
        />
        <Button>CREATE TEST</Button>
      </form>
    </div>
  );
};

export default TestCreate;
