import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./BlankQuestion.css";
import Button from "../Core/Button/Button";
import TestDesignView from "../Tests/TestCreate/TestDesign/TestDesignView/TestDesignView";
import { addQuestion, updateQuestion } from "../../store/actions/index";
import Switcher from "../Core/Switcher/Switcher";

const BlankQuestion = ({ questionContent, newQuestion }) => {
  const [position, setPosition] = useState(null);
  const [question, setQuestion] = useState("");
  const [partialQuestion1, setPartialQuestion1] = useState("");
  const [partialQuestion2, setPartialQuestion2] = useState("");
  const [answer, setAnswer] = useState("");
  const [partialAnswer1, setPartialAnswer1] = useState("");
  const [partialAnswer2, setPartialAnswer2] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [value, setValue] = useState(0);
  const [oldValue, setOldValue] = useState(0);
  const [isView, setIsView] = useState(false);
  const [error, setError] = useState(false);
  const [isThirdOptions, setIsThirdOptions] = useState(false);

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.test.questions);
  const testDetails = useSelector((state) => state.test.test);

  const onHandleAddQuestion = (e) => {
    e.preventDefault();
    if (
      (question !== "" &&
        answer !== "" &&
        partialAnswer1 !== "" &&
        partialAnswer2 !== "" &&
        option1 !== "" &&
        option2 !== "" &&
        +value > 0 &&
        +value <= 100 &&
        (+testDetails.grade + +value <= 100 ||
          +testDetails.grade + +value - +oldValue <= 100)) ||
      (question !== "" &&
        answer !== "" &&
        partialAnswer1 !== "" &&
        option1 !== "" &&
        option2 !== "" &&
        option3 !== "" &&
        +value > 0 &&
        +value <= 100 &&
        (+testDetails.grade + +value <= 100 ||
          +testDetails.grade + +value - +oldValue <= 100))
    ) {
      if (!isView) {
        dispatch(
          updateQuestion({
            position: position,
            content1: question,
            content2: partialQuestion1,
            content3: partialQuestion2,
            answer1: answer,
            answer2: partialAnswer1,
            answer3: partialAnswer2,
            option1: option1,
            option2: option2,
            option3: option3,
            value: +value,
            isThirdOptions: isThirdOptions,
            questionType: "complete",
            isView: false,
          })
        );
      } else {
        dispatch(
          addQuestion({
            position: position,
            content1: question,
            content2: partialQuestion1,
            content3: partialQuestion2,
            answer1: answer,
            answer2: partialAnswer1,
            answer3: partialAnswer2,
            option1: option1,
            option2: option2,
            option3: option3,
            value: +value,
            isThirdOptions: isThirdOptions,
            questionType: "complete",
            isView: false,
          })
        );
      }
      newQuestion();
    } else {
      setError(true);
      setTimeout(() => {
        cleanError();
      }, 2000);
    }
  };

  const cleanError = () => {
    setError(false);
  };

  const handleChangeConfig = (value) => {
    setIsThirdOptions(value);
    setPartialAnswer2("");
    setOption3("");
  };
  useEffect(() => {
    if (questionContent.position) {
      setPosition(questionContent.position);
    } else {
      setPosition(questions.length + 1);
    }
    setQuestion(questionContent.content1);
    setPartialQuestion1(questionContent.content2);
    setPartialQuestion2(questionContent.content3);
    setAnswer(questionContent.answer1);
    setPartialAnswer1(questionContent.answer2);
    setPartialAnswer2(questionContent.answer3);
    setOption1(questionContent.option1);
    setOption2(questionContent.option2);
    setOption3(questionContent.option3);
    setValue(questionContent.value);
    setOldValue(questionContent.value);
    setIsThirdOptions(questionContent.isThirdOptions);
    setIsView(questionContent.isView);
  }, [questionContent, questions.length]);

  return (
    <>
      <div className="blank-question-top">
        <form className="blank-question-structure">
          <div className="blank-question-layout">
            <input
              placeholder="Insert first partial question..."
              type="text"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
            <input
              placeholder="Insert second partial question..."
              type="text"
              onChange={(e) => setPartialQuestion1(e.target.value)}
              value={partialQuestion1}
            />
            <input
              placeholder="Insert third partial question..."
              type="text"
              onChange={(e) => setPartialQuestion2(e.target.value)}
              value={partialQuestion2}
            />
          </div>
          <div className="blank-question-structure-center">
            <div>
              <input
                placeholder="Insert distructure 1..."
                type="text"
                onChange={(e) => setOption1(e.target.value)}
                value={option1}
              />
              <input
                placeholder="Insert distructure 2..."
                type="text"
                onChange={(e) => setOption2(e.target.value)}
                value={option2}
              />
              <input
                disabled={!isThirdOptions}
                placeholder="Insert distructure 3..."
                type="text"
                onChange={(e) => setOption3(e.target.value)}
                value={option3}
              />
            </div>
            <div>
              <input
                placeholder="Insert answer 1..."
                type="text"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
              <input
                placeholder="Insert answer 2..."
                type="text"
                onChange={(e) => setPartialAnswer1(e.target.value)}
                value={partialAnswer1}
              />
              <input
                disabled={isThirdOptions}
                placeholder="Insert answer 3..."
                type="text"
                onChange={(e) => setPartialAnswer2(e.target.value)}
                value={partialAnswer2}
              />
            </div>
          </div>
          <div className="blank-question-structure-bottom">
            <div className="blank-question-structure-btn">
              <p>
                {error &&
                  "Sorry, Must fill all attributes/grade score must no over 100 points."}
              </p>
              <Button outlined clicked={(e) => onHandleAddQuestion(e)}>
                {!isView ? "UPDATE" : "ADD"} QUESTION
              </Button>
            </div>
            <div style={{ display: "flex", padding: "10px" }}>
              <input
                className="blank-question-value"
                type="number"
                min="0"
                max="100"
                placeholder="Insert a value..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <label style={{ marginRight: "10px" }}>Change Config</label>
              <Switcher
                position={isThirdOptions}
                clicked={handleChangeConfig}
              />
            </div>
          </div>
        </form>
        <div className="blank-question-view">
          <TestDesignView />
        </div>
      </div>
      <div className="question-blank-struct">
        <div className="question-blank-content">
          <h5>{position}.</h5>
          <div className="question-blank-options">
            <p>
              <span>{question} </span>
              <strong>
                <u>{answer}</u>
              </strong>
              <span> {partialQuestion1} </span>
              <strong>
                <u>{partialAnswer1}</u>
              </strong>
              <span> {partialQuestion2} </span>
              <strong>
                <u>{partialAnswer2}</u>
              </strong>
              ({value} POINTS)
            </p>
            <p>1) {answer} (ANSWER)</p>
            <p>2) {partialAnswer1}(ANSWER)</p>
            <p>
              3) {isThirdOptions ? option1 : partialAnswer2}
              {!isThirdOptions && <span>(ANSWER)</span>}
            </p>
            <p>4) {isThirdOptions ? option2 : option1}</p>
            <p>5) {isThirdOptions ? option3 : option2}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlankQuestion;
