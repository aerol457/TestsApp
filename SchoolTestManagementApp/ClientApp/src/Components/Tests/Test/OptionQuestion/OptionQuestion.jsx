import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";

import "./OptionQuestion.css";

const OptionQuestion = ({ question, index }) => {
  const [checkOption1, setCheckOption1] = useState(true);
  const [checkOption2, setCheckOption2] = useState(false);
  const [checkOption3, setCheckOption3] = useState(false);
  const [checkOption4, setCheckOption4] = useState(false);

  const handleChooseOption = (identifier) => {
    setCheckOption1(false);
    setCheckOption2(false);
    setCheckOption3(false);
    setCheckOption4(false);
    switch (identifier) {
      case "opt1":
        return setCheckOption1(true);
      case "opt2":
        return setCheckOption2(true);
      case "opt3":
        return setCheckOption3(true);
      case "opt4":
        return setCheckOption4(true);
      default:
        return setCheckOption1(true);
    }
  };

  return (
    <>
      <div className="test-question-option-config">
        <h5>Question {index}:</h5>
        <p>
          {question.content1}? <span>({question.value} POINTS)</span>
        </p>
      </div>
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
              <div>{question.option1}</div>
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
              <div>{question.option2}</div>
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
              <div>{question.option3}</div>
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
              <div>{question.option4}</div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default OptionQuestion;
