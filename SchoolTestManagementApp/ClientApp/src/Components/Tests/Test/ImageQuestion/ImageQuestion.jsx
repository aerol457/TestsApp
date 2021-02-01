import React, { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";

import "./ImageQuestion.css";

const ImageQuestion = ({
  question,
  index,
  setCurrentQuestion,
  setUserAnswer,
}) => {
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
        setUserAnswer(question.option1.id);
        return setCheckOption1(true);
      case "opt2":
        setUserAnswer(question.option2.id);
        return setCheckOption2(true);
      case "opt3":
        setUserAnswer(question.option3.id);
        return setCheckOption3(true);
      case "opt4":
        setUserAnswer(question.option4.id);
        return setCheckOption4(true);
    }
  };

  useEffect(() => {
    setCurrentQuestion(question);
    if (question.userAnswer !== "") {
      setUserAnswer(question.userAnswer);
      switch (question.userAnswer) {
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
    <div className="image-question">
      <div className="test-question-image">
        <h5>Question {index}:</h5>
        <p>
          {question.content1}? <span>({question.value} POINTS)</span>
        </p>
      </div>
      <div className="test-question-image-bottom-layout">
        <div className="test-question-image-options">
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
        <div className="image-question-img">
          <img src={`/Images/${question.imageUrl}`} alt="img question" />
        </div>
      </div>
    </div>
  );
};

export default ImageQuestion;
