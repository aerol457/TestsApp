import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "./Questions.css";

import Question from "./Question/Question";
import Card from "./Question/Card/Card";
import Button from "../../../../Core/Button/Button";
import Notification from "../../../../Core/Notification/Notification";
import { TestDesignDashContext } from "../../../../../context/TestDesignDashContext";

const Questions = () => {
  const [questionType, setQuestionType] = useState("option");
  const [index, setIndex] = useState(0);
  const [questionView, setQuestionView] = useState(null);
  const perPage = useState(6)[0];
  const [offset, setOffset] = useState(perPage);
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [questionsView, setQuestionsView] = useState([]);
  const [error, setError] = useState(false);

  const questions = useSelector((state) => state.test.questions);
  const test = useSelector((state) => state.test.test);
  const testDesignDashContext = useContext(TestDesignDashContext);

  const handleNextQuestions = () => {
    let updatePage = page + 1;
    if (updatePage <= totalPages) {
      let updateOffset = offset + perPage;
      setOffset(updateOffset);
      setPage(updatePage);
      setPosition(position + 1);
    }
  };

  const handlePrevQuestions = () => {
    let updatePage = page - 1;
    if (updatePage >= 0) {
      let updateOffset = offset - perPage;
      setOffset(updateOffset);
      setPage(updatePage);
      setPosition(position - 1);
    }
  };

  const handleViewQuestion = (question, index) => {
    setQuestionView(question);
    setIndex(index);
    setQuestionType(question.questionType);
  };

  const designPageCard = () => {
    const start = perPage * position;
    const slice = questions.slice(start, offset);
    const updateView = slice.map((q, i) => (
      <Card key={i} content={q} click={handleViewQuestion} index={i} />
    ));
    setQuestionsView(updateView);
  };

  const handleSubmitQuetions = () => {
    if (test.grade !== 100) {
      return setError(true);
    }
    testDesignDashContext.viewPublish();
  };

  useEffect(() => {
    let pages = 0;
    pages = questions.length / perPage;
    const addExtra = questions.length % perPage > 0;
    if (pages > 1 && addExtra) {
      pages += 1;
    } else if (pages < 1) {
      pages = 1;
    }
    const floorPages = Math.floor(pages);
    if (floorPages < totalPages) {
      handlePrevQuestions();
    }

    setTotalPages(floorPages);
  }, [questions.length]);

  useEffect(() => {
    if (questions) {
      designPageCard();
    }
  }, [page, questions]);

  return (
    <div className="questions">
      <Notification
        message="Grade Must be equal to 100 before proceeding"
        resetError={setError}
        error={error}
      />
      <div className="questions-design">
        <div className="questions-design-header">
          <div className="tabs">
            <div
              className={questionType === "option" ? "tab-active" : null}
              onClick={() => setQuestionType("option")}
            >
              Option
            </div>
            <div
              className={questionType === "image" ? "tab-active" : null}
              onClick={() => setQuestionType("image")}
            >
              Image
            </div>
            <div
              className={questionType === "check" ? "tab-active" : null}
              onClick={() => setQuestionType("check")}
            >
              Check
            </div>
            <div
              className={questionType === "blank" ? "tab-active" : null}
              onClick={() => setQuestionType("blank")}
            >
              Blank
            </div>
          </div>
          <div className="questions-grade">
            Total Grade: <span>{test.grade}</span>
          </div>
        </div>
        <div className="question-config-">
          <Question
            type={questionType}
            questionContent={questionView}
            index={index}
          />
        </div>
      </div>

      <div className="questions-view">
        <div className="navigate-questions">
          <IoIosArrowBack
            className={page === 1 ? "icon-navigate-disabled" : "icon-navigate"}
            onClick={handlePrevQuestions}
          />
        </div>
        {questionsView.length > 0 ? (
          <div className="questions-layout">{questionsView}</div>
        ) : (
          <div className="questions-list-empty">
            <p>Your questions list is empty, You can start to add.</p>
          </div>
        )}
        <div className="navigate-questions">
          <IoIosArrowForward
            className={
              page === totalPages ? "icon-navigate-disabled" : "icon-navigate"
            }
            onClick={handleNextQuestions}
          />
        </div>
      </div>

      <div className="questions-btn">
        <Button clicked={testDesignDashContext.viewSettings}>BACK</Button>
        <Button clicked={handleSubmitQuetions}>NEXT</Button>
      </div>
    </div>
  );
};

export default Questions;
