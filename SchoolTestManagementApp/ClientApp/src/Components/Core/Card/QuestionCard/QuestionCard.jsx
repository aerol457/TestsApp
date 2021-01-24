import React from "react";
import { useDispatch } from "react-redux";

import "./QuestionCard.css";
import Button from "../../../Core/Button/Button";
import { deleteQuestion } from "../../../../store/actions/index";

const QuestionCard = ({ questionData, clicked, newQuestion }) => {
  const dispatch = useDispatch();

  const handleRemoveQuestion = (e) => {
    e.stopPropagation();
    dispatch(deleteQuestion(questionData.position));
    newQuestion();
  };

  return (
    <div
      className="question-card-layout"
      onClick={() => clicked(questionData.position)}
    >
      <div className="question-card-top">
        <h2>{questionData.position}</h2>
        <Button filledRed clicked={(e) => handleRemoveQuestion(e)}>
          DELETE
        </Button>
      </div>
      <h3>{questionData.questionType}</h3>
      <h6>Value: {questionData.value}</h6>
    </div>
  );
};

export default QuestionCard;
