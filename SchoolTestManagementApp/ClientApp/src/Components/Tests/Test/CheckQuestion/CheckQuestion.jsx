import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import "./CheckQuestion.css";

const CheckQuestion = ({ question, index }) => {
  const [checkOption1, setCheckOption1] = useState(false);
  const [checkOption2, setCheckOption2] = useState(false);
  const [checkOption3, setCheckOption3] = useState(false);
  const [checkOption4, setCheckOption4] = useState(false);
  const [checkOption5, setCheckOption5] = useState(false);

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
                onChange={(e) => setCheckOption1(e.target.checked)}
              />
              {checkOption1 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option1}</div>
            </div>
          </label>
        </div>
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption2}
                onChange={(e) => setCheckOption2(e.target.checked)}
              />
              {checkOption2 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option2}</div>
            </div>
          </label>
        </div>
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption3}
                onChange={(e) => setCheckOption3(e.target.checked)}
              />
              {checkOption3 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option3}</div>
            </div>
          </label>
        </div>
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption4}
                onChange={(e) => setCheckOption4(e.target.checked)}
              />
              {checkOption4 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option4}</div>
            </div>
          </label>
        </div>
        <div>
          <label className="question-label">
            <div className="checkbox">
              <input
                type="checkbox"
                value={checkOption5}
                onChange={(e) => setCheckOption5(e.target.checked)}
              />
              {checkOption5 && (
                <AiOutlineCheck style={{ marginBottom: "10px" }} />
              )}
            </div>
            <div className="option-div">
              <div>{question.option5}</div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default CheckQuestion;
