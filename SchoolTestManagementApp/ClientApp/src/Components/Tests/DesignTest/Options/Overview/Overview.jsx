import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Overview.css";
import Button from "../../../../Core/Button/Button";
import Spinner from "../../../../Core/Spinner/Spinner";
import { TestDesignDashContext } from "../../../../../context/TestDesignDashContext";
import { DashboardContext } from "../../../../../context/DashboardContext";
import { addTest, clearTest } from "../../../../../store/actions/index";

const Overview = () => {
  const [viewClass, setViewClass] = useState(false);
  const testDesignDashContext = useContext(TestDesignDashContext);
  const dashboardContext = useContext(DashboardContext);
  const test = useSelector((state) => state.test.test);
  const questions = useSelector((state) => state.test.questions);
  const classrooms = useSelector((state) => state.test.classrooms);
  const loading = useSelector((state) => state.test.loading);
  const dispatch = useDispatch();

  const confirmAddTest = () => {
    test.quantityOfQuestions = questions.length;
    test.dateOfDistribution = new Date();
    const idClassrooms = classrooms.map((c) => {
      if (!c.isAssign) {
        return;
      }
      return c.id;
    });
    dispatch(
      addTest({
        ...test,
        questionList: questions,
        idClassrooms,
      })
    );
    dispatch(clearTest());
    dashboardContext.viewTests();
    testDesignDashContext.viewSettings();
  };

  useEffect(() => {
    if (classrooms) {
      let isView = false;
      classrooms.forEach((c) => {
        if (c.isAssign) {
          isView = true;
        }
      });
      setViewClass(isView);
    }
  }, []);

  return (
    <div className="overview">
      <h1>Test Summary</h1>
      <div className="publish-overview-section">
        <h5>Test Details:</h5>
        <div className="test-overview-details">
          <div>
            <p>
              Name: <span>{test.name}</span>
            </p>
            <p>
              Profession: <span>{test.professionName}</span>
            </p>
            <p>
              Questions Quantity: <span>{questions.length}</span>
            </p>
          </div>
          <div>
            <p>
              Time: <span>{test.time}</span>
            </p>
            <p>
              Passing Grade: <span>{test.passingGrade}</span>
            </p>
            <p>
              Submission Date: <span>{test.dateOfSubmission}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="publish-overview-section">
        <h5>Questions:</h5>
        <ul className="questions-list-overview">
          {questions.map((q, i) => {
            return (
              <li key={i} className="question-overview">
                <div className="question-content-overview">
                  <h5>Question {q.position}:</h5>
                  <p>
                    {q.content1} ({q.value} POINTS)
                  </p>
                  <p>1) {q.option1}</p>
                  <p>2) {q.option2}</p>
                  <p>3) {q.option3}</p>
                  <p>4) {q.answer1} (ANSWER)</p>
                  {(q.questionType === "check" ||
                    q.questionType === "blank") && (
                    <p>5) {q.answer2} (ANSWER)</p>
                  )}
                </div>
                {q.questionType === "image" && (
                  <div className="question-image-overview">
                    <img
                      className="question-image-overview-content"
                      src="./images/defaultQuestion.png"
                      alt="question"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="publish-overview-section">
        <h5>Classrooms To Publish:</h5>
        <ul className="test-overview-classes-list">
          {viewClass ? (
            classrooms.map((c, i) => {
              if (!c.isAssign) {
                return;
              }
              return <li key={i}> {c.name}</li>;
            })
          ) : (
            <p>No classes were selected</p>
          )}
        </ul>
      </div>
      <div className="overview-btn">
        <Button clicked={testDesignDashContext.viewPublish}>BACK</Button>
        <Button clicked={confirmAddTest}>
          {loading ? <Spinner /> : "CONFIRM"}
        </Button>
      </div>
    </div>
  );
};

export default Overview;
