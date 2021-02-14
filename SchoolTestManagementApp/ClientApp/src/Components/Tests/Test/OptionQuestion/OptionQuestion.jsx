import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GoPrimitiveDot } from "react-icons/go";

import "./OptionQuestion.css";
import { insertUserAnswer } from "../../../../store/actions/index";

const OptionQuestion = ({ question, index }) => {
  const [checkOption1, setCheckOption1] = useState(false);
  const [checkOption2, setCheckOption2] = useState(false);
  const [checkOption3, setCheckOption3] = useState(false);
  const [checkOption4, setCheckOption4] = useState(false);
  const dispatch = useDispatch();

  const handleChooseOption = (identifier) => {
    setCheckOption1(false);
    setCheckOption2(false);
    setCheckOption3(false);
    setCheckOption4(false);
    let userAnswer = 0;
    switch (identifier) {
      case "opt1":
        userAnswer = question.option1.id;
        setCheckOption1(true);
        break;
      case "opt2":
        userAnswer = question.option2.id;
        setCheckOption2(true);
        break;
      case "opt3":
        userAnswer = question.option3.id;
        setCheckOption3(true);
        break;
      case "opt4":
        userAnswer = question.option4.id;
        setCheckOption4(true);
        break;
    }
    if (userAnswer !== 0) {
      dispatch(insertUserAnswer(userAnswer, null, index));
    }
  };

  useEffect(() => {
    if (question.userAnswer1 !== 0) {
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
      }
    }
  }, [question]);

  return (
    <>
      <div className="test-question-option-config">
        <h5>Question {index + 1}:</h5>
        <p>
          {question.content1}? <span>({question.value} POINTS)</span>
        </p>
      </div>
      <div
        className={
          question.questionType === "image"
            ? "test-question-option-layout"
            : "test-question-option"
        }
      >
        <div className="test-question-option-options">
          <div>
            <label className="question-label">
              <div className="radio">
                <input
                  type="radio"
                  name="opt1"
                  value={checkOption1}
                  onClick={(e) => handleChooseOption(e.target.name)}
                />
                {checkOption1 && (
                  <GoPrimitiveDot
                    style={{ marginBottom: "10px", marginLeft: "1px" }}
                  />
                )}
              </div>
              <div className="option-div">
                <div>{question.option1.content}</div>
              </div>
            </label>
          </div>
          <div>
            <label className="question-label">
              <div className="radio">
                <input
                  type="radio"
                  name="opt2"
                  value={checkOption2}
                  onClick={(e) => handleChooseOption(e.target.name)}
                />
                {checkOption2 && (
                  <GoPrimitiveDot
                    style={{ marginBottom: "10px", marginLeft: "1px" }}
                  />
                )}
              </div>
              <div className="option-div">
                <div>{question.option2.content}</div>
              </div>
            </label>
          </div>
          <div>
            <label className="question-label">
              <div className="radio">
                <input
                  type="radio"
                  name="opt3"
                  value={checkOption3}
                  onClick={(e) => handleChooseOption(e.target.name)}
                />
                {checkOption3 && (
                  <GoPrimitiveDot
                    style={{ marginBottom: "10px", marginLeft: "1px" }}
                  />
                )}
              </div>
              <div className="option-div">
                <div>{question.option3.content}</div>
              </div>
            </label>
          </div>
          <div>
            <label className="question-label">
              <div className="radio">
                <input
                  type="radio"
                  name="opt4"
                  value={checkOption4}
                  onClick={(e) => handleChooseOption(e.target.name)}
                />
                {checkOption4 && (
                  <GoPrimitiveDot
                    style={{ marginBottom: "10px", marginLeft: "1px" }}
                  />
                )}
              </div>
              <div className="option-div">
                <div>{question.option4.content}</div>
              </div>
            </label>
          </div>
        </div>
        {question.questionType === "image" && (
          <div className="test-question-option-img">
            <img src={`/Images/${question.imageUrl}`} alt="img question" />
          </div>
        )}
      </div>
    </>
  );
};

export default OptionQuestion;
