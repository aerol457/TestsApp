import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import "./Test.css";
import Button from "../../Core/Button/Button";
import CheckQuestion from "./CheckQuestion/CheckQuestion";
import OptionQuestion from "./OptionQuestion/OptionQuestion";
import { DashboardContext } from "../../../context/DashboardContext";
import {
  finishTest,
  clearTest,
  getAllTest,
} from "../../../store/actions/index";
const Test = () => {
  const [questionsView, setQuestionsView] = useState([]);
  const [question, setQuestion] = useState();
  const [position, setPosition] = useState(0);
  const [page, setPage] = useState(1);
  const [houres, setHoures] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const test = useSelector((state) => state.test.test);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const questions = useSelector((state) => state.test.questions);
  const dashboardContext = useContext(DashboardContext);

  const dispatch = useDispatch();

  const createQuestions = () => {
    const questionsViewList = questions.map((q, i) => {
      return (
        <div className="test-container" key={i}>
          {q.questionType === "option" || q.questionType === "image" ? (
            <OptionQuestion question={q} index={i} />
          ) : (
            <CheckQuestion question={q} index={i} />
          )}
        </div>
      );
    });
    setQuestion(questionsViewList[position]);
    setQuestionsView(questionsViewList);
  };

  const handleNextQuestion = () => {
    let updatePosition = position + 1;
    let updatedPage = page + 1;
    const nextQuestion = questionsView[updatePosition];
    setQuestion(nextQuestion);
    setPosition(updatePosition);
    setPage(updatedPage);
  };

  const handlePrevQuestion = () => {
    let updatePosition = position - 1;
    let updatedPage = page - 1;
    const prevQuestion = questionsView[updatePosition];
    setQuestion(prevQuestion);
    setPosition(updatePosition);
    setPage(updatedPage);
  };

  const endTest = () => {
    dispatch(finishTest(questions, test));
    dispatch(clearTest());
    dashboardContext.viewTests();
  };

  useEffect(() => {
    if (questions.length > 0) {
      createQuestions();
    }
  }, [questions]);

  useEffect(() => {
    if (test.time) {
      setSeconds(0);
      setMinutes(+test.time % 60);
      setHoures(Math.floor(+test.time / 60));
      setStartTimer(true);
    }
  }, [test]);

  useEffect(() => {
    if (startTimer) {
      let timer = null;
      let timerSeconds = seconds;
      let timerMinutes = minutes;
      let timerHoures = houres;
      timer = setInterval(function () {
        if (timerSeconds > 0) {
          timerSeconds--;
        } else {
          timerSeconds = 59;
          if (timerMinutes > 0) {
            timerMinutes--;
          } else {
            if (timerHoures > 0) {
              timerHoures--;
              timerMinutes = 59;
            }
          }
        }
        setSeconds(timerSeconds);
        setMinutes(timerMinutes);
        setHoures(timerHoures);
        if (timerSeconds === 0 && timerMinutes === 0 && timerHoures === 0) {
          endTest();
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTimer]);

  return (
    <div className="test-struct">
      <div className="test-view-details">
        <div className="test-view-details-col-1">
          <div>
            <label>Id Test:</label>
            <h5>{test.idTest}</h5>
            <label>Test Name:</label>
            <h5>{test.name}</h5>
            <label>Profession:</label>
            <h5>{test.professionName}</h5>
          </div>
          <div>
            <label>Questions Quantity:</label>
            <h5>{test.quantityOfQuestions}</h5>
            <label>Teacher Name:</label>
            <h5>{test.name}</h5>
            <label>Test Duration(minutes):</label>
            <h5>{test.time}</h5>
          </div>
        </div>
        <div className="test-view-details-col-2">
          <div>
            <h4>
              Time Remaining:
              <br />
              <label>
                <span>
                  {houres.toString() < 10
                    ? "0" + houres.toString()
                    : houres.toString()}
                </span>
                :
                <span>
                  {minutes.toString() < 10
                    ? "0" + minutes.toString()
                    : minutes.toString()}
                </span>
                :
                <span>
                  {seconds.toString() < 10
                    ? "0" + seconds.toString()
                    : seconds.toString()}
                </span>
              </label>
            </h4>
          </div>
          <div className="test-view-details-controls">
            <Button clicked={endTest}>END TEST</Button>
          </div>
        </div>
      </div>
      <div className="test-view-questions-container">
        <div className="question-navigation">
          <IoIosArrowBack
            className={page !== 1 ? "navigate-arrow" : "navigate-arrow-disable"}
            onClick={() => handlePrevQuestion()}
          />
        </div>
        <div className="test-view-question-content">
          <div className="test-view-question-page">
            <p>
              {page}/{test.quantityOfQuestions}
            </p>
          </div>
          <div>{question}</div>
        </div>
        <div className="question-navigation">
          <IoIosArrowForward
            className={
              page !== questionsView.length
                ? "navigate-arrow"
                : "navigate-arrow-disable"
            }
            onClick={() => handleNextQuestion()}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
