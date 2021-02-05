import React from "react";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./Card.css";
import { deleteQuestion } from "../../../../../../../store/actions/index";

const QuestionCard = ({ content, click }) => {
  const dispatch = useDispatch();

  const handleRemoveQuestion = (e) => {
    e.stopPropagation();
    dispatch(deleteQuestion(content.position));
  };

  return (
    <div className="question-card">
      <div className="question-card-content" onClick={() => click(content)}>
        <h2>{content.position}</h2>
        <h3>{content.questionType}</h3>
        <h6>Value: {content.value}</h6>
      </div>
      <div className="remove-card">
        <span>
          <RiDeleteBin6Line
            className="remove-icon"
            onClick={(e) => handleRemoveQuestion(e)}
          />
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
