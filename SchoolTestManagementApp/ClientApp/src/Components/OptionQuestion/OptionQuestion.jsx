import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OptionQuestion.css";
import Button from "../Core/Button/Button";
import TestDesignView from "../../Components/Tests/TestCreate/TestDesign/TestDesignView/TestDesignView";
import OptionQuestionView from "../../Components/Tests/Test/OptionQuestion/OptionQuestion";
import { addQuestion, updateQuestion } from "../../store/actions/index";

const OptionQuestion = ({ questionContent, newQuestion }) => {
  const [position, setPosition] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [value, setValue] = useState(0);
  const [oldValue, setOldValue] = useState(0);
  const [isView, setIsView] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.test.questions);
  const testDetails = useSelector((state) => state.test.test);

  const onHandleAddQuestion = (e) => {
    e.preventDefault();
    if (
      question !== "" &&
      answer !== "" &&
      option1 !== "" &&
      option2 !== "" &&
      option3 !== "" &&
      +value > 0 &&
      +value <= 100 &&
      (+testDetails.grade + +value <= 100 ||
        +testDetails.grade + +value - +oldValue <= 100)
    ) {
      if (!isView) {
        dispatch(
          updateQuestion({
            position: position,
            content1: question,
            answer1: answer,
            option1: option1,
            option2: option2,
            option3: option3,
            value: +value,
            questionType: "option",
            isView: false,
          })
        );
      } else {
        dispatch(
          addQuestion({
            position: position,
            content1: question,
            answer1: answer,
            option1: option1,
            option2: option2,
            option3: option3,
            value: +value,
            questionType: "option",
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

  useEffect(() => {
    if (questionContent.position) {
      setPosition(questionContent.position);
    } else {
      setPosition(questions.length + 1);
    }
    setQuestion(questionContent.content1);
    setAnswer(questionContent.answer1);
    setOption1(questionContent.option1);
    setOption2(questionContent.option2);
    setOption3(questionContent.option3);
    setValue(questionContent.value);
    setOldValue(questionContent.value);
    setIsView(questionContent.isView);
  }, [questionContent, questions.length]);

  return (
    <>
      <div className="option-question-top">
        <form className="option-question-structure">
          <div className="option-question-structure-top">
            <input
              className="option-question-content"
              placeholder="Insert a option question content..."
              type="text"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
            <input
              className="option-question-value"
              type="number"
              min="0"
              max="100"
              placeholder="Insert a value..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </div>
          <div className="option-question-structure-bottom">
            <div>
              <input
                placeholder="Insert option 1..."
                type="text"
                onChange={(e) => setOption1(e.target.value)}
                value={option1}
              />
              <input
                placeholder="Insert option 2..."
                type="text"
                onChange={(e) => setOption2(e.target.value)}
                value={option2}
              />
              <input
                placeholder="Insert option 3..."
                type="text"
                onChange={(e) => setOption3(e.target.value)}
                value={option3}
              />
            </div>
            <div>
              <textarea
                placeholder="Insert answer..."
                type="text"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </div>
          </div>
          <p>
            {error &&
              "Sorry, Must fill all attributes/grade score must no over 100 points."}
          </p>
          <Button outlined clicked={(e) => onHandleAddQuestion(e)}>
            {!isView ? "UPDATE" : "ADD"} QUESTION
          </Button>
        </form>
        <TestDesignView />
      </div>
      <div className="test-view">
        <div className="option-question-view"></div>
      </div>
    </>
  );
};

export default OptionQuestion;
