import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import "./Test.css";
import Button from "../../Core/Button/Button";
import ImageQuestion from "./ImageQuestion/ImageQuestion";
import CheckQuestion from "./CheckQuestion/CheckQuestion";
import OptionQuestion from "./OptionQuestion/OptionQuestion";
import { DashboardContext } from "../../../context/TeacherContext/DashboardContext";
import {
  getClassroomForPublishTest,
  publishTest,
  insertUserAnswer,
  finishTest,
} from "../../../store/actions/index";
const Test = () => {
  const [questionsView, setQuestionsView] = useState([]);
  const [question, setQuestion] = useState();
  const [position, setPosition] = useState(0);
  const [startTest, setStartTest] = useState(false);
  const [testState, setTestState] = useState("");
  const [page, setPage] = useState(1);
  const [houres, setHoures] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [checkClass7th, setCheckClass7th] = useState(-1);
  const [checkClass8th, setCheckClass8th] = useState(-1);
  const [checkClass9th, setCheckClass9th] = useState(-1);
  const [checkClass10th, setCheckClass10th] = useState(-1);
  const [checkClass11th, setCheckClass11th] = useState(-1);
  const [checkClass12th, setCheckClass12th] = useState(-1);
  const [userAnswer, setUserAnswer] = useState(0);
  const [userMultipleAnswers, setUserMultipleAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const test = useSelector((state) => state.test.test);
  const questions = useSelector((state) => state.test.questions);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const classrooms = useSelector((state) => state.general.classrooms);
  const dashboardContext = useContext(DashboardContext);

  const dispatch = useDispatch();

  const createQuestions = () => {
    const questionsViewList = questions.map((q, i) => {
      return (
        <div className="test-container" key={i}>
          {q.questionType === "option" ? (
            <OptionQuestion
              question={q}
              index={i + 1}
              setUserAnswer={setUserAnswer}
              setCurrentQuestion={setCurrentQuestion}
            />
          ) : q.questionType === "check" || q.questionType === "complete" ? (
            <CheckQuestion
              question={q}
              index={i + 1}
              setUserMultipleAnswers={setUserMultipleAnswers}
              setCurrentQuestion={setCurrentQuestion}
            />
          ) : (
            <ImageQuestion
              question={q}
              index={i + 1}
              setUserAnswer={setUserAnswer}
              setCurrentQuestion={setCurrentQuestion}
            />
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
    if (updatePosition < questionsView.length) {
      const nextQuestion = questionsView[updatePosition];
      if (startTest) {
        dispatch(
          insertUserAnswer(userAnswer, userMultipleAnswers, currentQuestion)
        );
        setUserAnswer(0);
        setUserMultipleAnswers([]);
        setCurrentQuestion({});
      }
      setQuestion(nextQuestion);
      setPosition(updatePosition);
      setPage(updatedPage);
    }
  };

  const handlePrevQuestion = () => {
    let updatePosition = position - 1;
    let updatedPage = page - 1;
    if (updatePosition >= 0) {
      const prevQuestion = questionsView[updatePosition];
      if (startTest) {
        dispatch(
          insertUserAnswer(userAnswer, userMultipleAnswers, currentQuestion)
        );
        setUserAnswer(0);
        setUserMultipleAnswers([]);
        setCurrentQuestion({});
      }
      setQuestion(prevQuestion);
      setPosition(updatePosition);
      setPage(updatedPage);
    }
  };

  const endTest = () => {
    // dispatch(finishTest(questions, test.id));
    setTestState("stop");
  };

  const handleChooseClasses = (identifier, id) => {
    switch (identifier) {
      case "7th":
        return setCheckClass7th((prevState) => (prevState === -1 ? id : -1));
      case "8th":
        return setCheckClass8th((prevState) => (prevState === -1 ? id : -1));
      case "9th":
        return setCheckClass9th((prevState) => (prevState === -1 ? id : -1));
      case "10th":
        return setCheckClass10th((prevState) => (prevState === -1 ? id : -1));
      case "11th":
        return setCheckClass11th((prevState) => (prevState === -1 ? id : -1));
      case "12th":
        return setCheckClass12th((prevState) => (prevState === -1 ? id : -1));
      default:
        return;
    }
  };

  const handlePublishTest = () => {
    const classToPublish = [];

    if (checkClass7th) {
      classToPublish.push(checkClass7th);
    }
    if (checkClass8th) {
      classToPublish.push(checkClass8th);
    }
    if (checkClass9th) {
      classToPublish.push(checkClass9th);
    }
    if (checkClass10th) {
      classToPublish.push(checkClass10th);
    }
    if (checkClass11th) {
      classToPublish.push(checkClass11th);
    }
    if (checkClass12th) {
      classToPublish.push(checkClass12th);
    }
    const filterClassrooms = classToPublish.filter((id) => id !== -1);
    if (filterClassrooms.length > 0) {
      dispatch(publishTest(test.id, filterClassrooms));
    }
    dashboardContext.viewTests();
  };

  useEffect(() => {
    if (test) {
      userProfile.userType === "student" && setStartTest(true);
      setHoures(Math.floor(+test.time / 60));
      setMinutes(+test.time % 60);
    }
  }, [test]);

  useEffect(() => {
    createQuestions();
    userProfile.userType === "teacher" &&
      dispatch(getClassroomForPublishTest(test.id));
  }, [questions, getClassroomForPublishTest]);

  useEffect(() => {
    let timer = null;
    let timerSeconds = seconds;
    let timerMinutes = minutes;
    let timerHoures = houres;
    console.log("render");
    timer = setTimeout(function () {
      if (seconds > 0) {
        timerSeconds--;
      } else {
        timerSeconds = 1;
        if (minutes > 0) {
          console.log("minutes1", minutes);
          // timerMinutes--;
          setMinutes(timerMinutes - 1);
        } else {
          if (houres > 0) {
            // timerHoures--;
            // timerMinutes = 59;
            setMinutes(59);
            setHoures(timerHoures - 1);
          } else {
            if (testState === "start") {
              endTest();
            }
          }
        }
      }
      setSeconds(timerSeconds);
    }, 1000);
    setTestState("start");
    switch (testState) {
      case "stop":
        clearTimeout(timer);
        dashboardContext.viewTests();
        break;
    }
  }, [seconds, minutes]);

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
          {userProfile.idProfession && (
            <div className="test-publish-classes-list">
              {classrooms.map((c, i) => {
                let input = (
                  <input
                    type="checkbox"
                    name={c.name}
                    onChange={(e) => handleChooseClasses(e.target.name, c.id)}
                  />
                );
                if (c.isAssign) {
                  input = (
                    <input
                      type="checkbox"
                      checked={c.isAssign}
                      disabled={c.isAssign}
                      name={c.name}
                      onChange={(e) => handleChooseClasses(e.target.name, c.id)}
                    />
                  );
                }
                return (
                  <label key={i}>
                    {input}
                    {c.name}
                  </label>
                );
              })}
            </div>
          )}
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
            {userProfile.idProfession ? (
              <>
                <Button clicked={dashboardContext.viewTests}>
                  RETURN TO TESTS
                </Button>
                <Button outlined clicked={handlePublishTest}>
                  PUBLISH TEST
                </Button>
              </>
            ) : (
              <>
                {!startTest ? (
                  <>
                    <Button clicked={dashboardContext.viewTests}>
                      RETURN TO TESTS
                    </Button>
                  </>
                ) : (
                  <Button clicked={endTest}>END TEST</Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="test-view-questions-container">
        {startTest ||
          (userProfile.userType === "teacher" && (
            <>
              <div className="question-navigation">
                <IoIosArrowBack
                  className={
                    page !== 1 ? "navigate-arrow" : "navigate-arrow-disable"
                  }
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
            </>
          ))}
      </div>
    </div>
  );
};

export default Test;
