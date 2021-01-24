import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import "./Test.css";
import Button from "../../Core/Button/Button";
import ImageQuestion from "./ImageQuestion/ImageQuestion";
import CheckQuestion from "./CheckQuestion/CheckQuestion";
import OptionQuestion from "./OptionQuestion/OptionQuestion";
import { DashboardContext } from "../../../context/TeacherContext/DashboardContext";
import { TestContext } from "../../../context/StudentContext/TestContext";
import {
  getClassroomForPublishTest,
  publishTest,
} from "../../../store/actions/index";
const Test = () => {
  const [questionsView, setQuestionsView] = useState([]);
  const [question, setQuestion] = useState();
  const [position, setPosition] = useState(0);
  const [startTest, setStartTest] = useState(false);
  const [timer, setTimer] = useState(null);
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
  const test = useSelector((state) => state.test.test);
  const questions = useSelector((state) => state.test.questions);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const classrooms = useSelector((state) => state.general.classrooms);
  const dashboardContext = useContext(DashboardContext);
  const testContext = useContext(TestContext);

  const dispatch = useDispatch();

  const createQuestions = () => {
    //HAndle
    const questionsViewList = testContext.questions.map((q, i) => {
      return (
        <div className="test-container" key={i}>
          {q.questionType === "option" ? (
            <OptionQuestion question={q} index={i + 1} />
          ) : q.questionType === "check" || q.questionType === "complete" ? (
            <CheckQuestion question={q} index={i + 1} />
          ) : (
            <ImageQuestion question={q} index={i + 1} />
          )}
        </div>
      );
    });
    setQuestion(questionsViewList[position]);
    setQuestionsView(questionsViewList);
  };

  const createQuestionsToTest = () => {
    const questionList = questions.map((q) => {
      if (q.questionType === "option" || q.questionType === "image") {
        const question = {
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answerPosition: "",
          content1: "",
          questionType: "",
          value: 0,
          idTest: -1,
        };
        let numberOne = Math.round(Math.random() * 4) + 1;
        let indexs = [];
        for (let i = 1; i < 5; i++) {
          if (i !== numberOne) {
            indexs.push(i);
          }
        }
        question["option" + indexs[0]] = q.option1;
        question["option" + indexs[1]] = q.option2;
        question["option" + indexs[2]] = q.option3;
        question["option" + numberOne] = q.answer1;
        question.answerPosition = numberOne;
        question.value = q.value;
        question.content1 = q.content1;
        question.questionType = q.questionType;
        question.imageUrl = q.imageUrl;
        question.idTest = q.idTest;
        return question;
      } else {
        const question = {
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          option5: "",
          answerPosition1: "",
          answerPosition2: "",
          answerPosition3: "",
          content1: "",
          content2: "",
          content3: "",
          questionType: "",
          value: 0,
          idTest: -1,
        };
        const numberThree = Math.floor(Math.random() * 5) + 1;
        let numberOne = numberThree;
        let numberTwo = numberThree;
        do {
          numberOne = Math.floor(Math.random() * 5) + 1;
        } while (numberOne === numberThree);
        do {
          numberTwo = Math.floor(Math.random() * 5) + 1;
        } while (numberTwo === numberThree || numberTwo === numberOne);
        question["option" + numberOne] = q.answer1;
        question["option" + numberTwo] = q.answer2;
        let indexs = [];
        if (q.answer3 === "") {
          for (let i = 1; i < 6; i++) {
            if (i !== numberOne && i !== numberTwo) {
              indexs.push(i);
            }
          }
          question["option" + indexs[0]] = q.option1;
          question["option" + indexs[1]] = q.option2;
          question["option" + indexs[2]] = q.option3;
        } else {
          question["option" + numberThree] = q.answer3;
          question.answerPosition3 = numberThree;
          for (let i = 1; i < 6; i++) {
            if (i !== numberOne && i !== numberTwo && i !== numberThree) {
              indexs.push(i);
            }
          }
          question["option" + indexs[0]] = q.option1;
          question["option" + indexs[1]] = q.option2;
        }
        question.answerPosition1 = numberOne;
        question.answerPosition2 = numberTwo;
        question.value = q.value;
        question.content1 = q.content1;
        question.content2 = q.content2;
        question.content3 = q.content3;
        question.questionType = q.questionType;
        question.idTest = q.idTest;
        return question;
      }
    });
    testContext.initQuestions(questionList);
  };

  const handleNextQuestion = () => {
    let updatePosition = position + 1;
    let updatedPage = page + 1;
    if (updatePosition < questionsView.length) {
      const nextQuestion = questionsView[updatePosition];
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
      setQuestion(prevQuestion);
      setPosition(updatePosition);
      setPage(updatedPage);
    }
  };

  const startTimer = () => {
    let timerHoures = houres;
    let timerMinutes = minutes;
    let timerSeconds = 0;
    let stopTimer = true;
    let timerLocal = null;
    const intervalTimer = setInterval(function () {
      if (timerLocal === null) {
        timerLocal = intervalTimer;
        setTimer(intervalTimer);
      }
      if (stopTimer) {
        if (timerSeconds === 0) {
          timerSeconds = 60;
          if (timerMinutes > 0) {
            timerMinutes--;
          } else if (timerHoures > 0) {
            timerHoures--;
            timerMinutes = 59;
          } else {
            timerSeconds = 1;
            stopTimer = false;
          }
        }
        timerSeconds--;
        setSeconds(timerSeconds);
        setMinutes(timerMinutes);
        setHoures(timerHoures);
      } else {
        endTest();
      }
    }, 1000);
  };

  const onStartTest = () => {
    setStartTest(true);
    startTimer();
  };

  const endTest = () => {
    clearInterval(timer);
  };

  const initialTimer = () => {
    let initialHour = Math.floor(+test.time / 60);
    let initialMinute = +test.time % 60;
    setHoures(initialHour);
    setMinutes(initialMinute);
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
    dispatch(publishTest(test.id, filterClassrooms));
    dashboardContext.viewTests();
  };

  useEffect(() => {
    createQuestions();
    initialTimer();
    userProfile.idProfession && dispatch(getClassroomForPublishTest(test.id));
  }, [questions, getClassroomForPublishTest]);

  useEffect(() => {
    createQuestionsToTest();
  }, []);

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
                    <Button outlined clicked={onStartTest}>
                      START TEST
                    </Button>
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
