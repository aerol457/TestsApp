import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./Card.css";
import {
  deleteQuestion,
  updateTestQuantity,
} from "../../../../../../../store/actions/index";

const QuestionCard = ({ content, click, index }) => {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test.test);
  const handleRemoveQuestion = (e) => {
    e.stopPropagation();
    dispatch(deleteQuestion(content.id, index));
    const updateQuantity = { ...test };
    updateQuantity.quantityOfQuestions -= 1;
    dispatch(updateTestQuantity(updateQuantity));
  };

  return (
    <div className="question-card">
      <div
        className="question-card-content"
        onClick={() => click(content, index)}
      >
        <h2>{index + 1}</h2>
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
