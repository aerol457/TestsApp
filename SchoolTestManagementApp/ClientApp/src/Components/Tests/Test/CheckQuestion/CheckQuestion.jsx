import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import "./CheckQuestion.css";

const CheckQuestion = ({
  question,
  index,
  setUserMultipleAnswers,
  setCurrentQuestion,
}) => {
  const [checkOption1, setCheckOption1] = useState(false);
  const [checkOption2, setCheckOption2] = useState(false);
  const [checkOption3, setCheckOption3] = useState(false);
  const [checkOption4, setCheckOption4] = useState(false);
  const [checkOption5, setCheckOption5] = useState(false);
  const [disableChecks, setDisableChecks] = useState(false);
  const [validate, setValidate] = useState(0);

  const handleChooseOption = (e, check) => {
    let isValid = validate;
    let isCheck = !check;
    if (isCheck && isValid < 2) {
      isValid++;
    } else if (isValid > 0) {
      isValid--;
    }
    switch (isValid) {
      case 2:
        if (isCheck) {
          setDisableChecks(true);
        } else {
          setDisableChecks(false);
        }
        break;
      case 1:
        setDisableChecks(false);
        break;
    }
    const answers = [];
    let option1 = checkOption1;
    let option2 = checkOption2;
    let option3 = checkOption3;
    let option4 = checkOption4;
    let option5 = checkOption5;
    switch (e.target.name) {
      case "opt1":
        option1 = !checkOption1;
        setCheckOption1(option1);
        break;
      case "opt2":
        option2 = !checkOption2;
        setCheckOption2(option2);
        break;
      case "opt3":
        option3 = !checkOption3;
        setCheckOption3(option3);
        break;
      case "opt4":
        option4 = !checkOption4;
        setCheckOption4(option4);
        break;
      case "opt5":
        option5 = !checkOption5;
        setCheckOption5(option5);
        break;
    }
    if (option1) {
      answers.push(question.option1.id);
    }
    if (option2) {
      answers.push(question.option2.id);
    }
    if (option3) {
      answers.push(question.option3.id);
    }
    if (option4) {
      answers.push(question.option4.id);
    }
    if (option5) {
      answers.push(question.option5.id);
    }
    setValidate(answers.length);
    setUserMultipleAnswers(answers);
  };

  useEffect(() => {
    const initialAnswers = [];
    setCurrentQuestion(question);
    if (question.userAnswer1 !== 0) {
      initialAnswers.push(question.userAnswer1);
      switch (question.userAnswer1) {
        case question.option1.id:
          setCheckOption1(true);
          break;
        case question.option2.id:
          setCheckOption2(true);
          break;
        case question.option3.id:
          setCheckOption3(true);
          break;
        case question.option4.id:
          setCheckOption4(true);
          break;
        case question.option5.id:
          setCheckOption5(true);
          break;
      }
      if (question.userAnswer2 !== 0) {
        initialAnswers.push(question.userAnswer2);
        switch (question.userAnswer2) {
          case question.option1.id:
            setCheckOption1(true);
            break;
          case question.option2.id:
            setCheckOption2(true);
            break;
          case question.option3.id:
            setCheckOption3(true);
            break;
          case question.option4.id:
            setCheckOption4(true);
            break;
          case question.option5.id:
            setCheckOption5(true);
            break;
        }
        setValidate(2);
        setDisableChecks(true);
      } else {
        setValidate(1);
      }
      setUserMultipleAnswers(initialAnswers);
    }
  }, [question]);

  return (
    <>
      <div className="test-question-check-config">
        <h5>Question {index}:</h5>
        <p>
          {question.content1}? <span>({question.value} POINTS)</span>
        </p>
      </div>
      <div className="test-question-check-options">
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption1}
                name="opt1"
                disabled={disableChecks && !checkOption1 ? true : false}
                onChange={(e) => handleChooseOption(e, checkOption1)}
              />
              {checkOption1 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option1.content}</div>
            </div>
          </label>
        </div>
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption2}
                name="opt2"
                disabled={disableChecks && !checkOption2 ? true : false}
                onChange={(e) => handleChooseOption(e, checkOption2)}
              />
              {checkOption2 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option2.content}</div>
            </div>
          </label>
        </div>
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption3}
                name="opt3"
                disabled={disableChecks && !checkOption3 ? true : false}
                onChange={(e) => handleChooseOption(e, checkOption3)}
              />
              {checkOption3 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option3.content}</div>
            </div>
          </label>
        </div>
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption4}
                name="opt4"
                disabled={disableChecks && !checkOption4 ? true : false}
                onChange={(e) => handleChooseOption(e, checkOption4)}
              />
              {checkOption4 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option4.content}</div>
            </div>
          </label>
        </div>
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption5}
                name="opt5"
                disabled={disableChecks && !checkOption5 ? true : false}
                onChange={(e) => handleChooseOption(e, checkOption5)}
              />
              {checkOption5 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option5.content}</div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default CheckQuestion;
