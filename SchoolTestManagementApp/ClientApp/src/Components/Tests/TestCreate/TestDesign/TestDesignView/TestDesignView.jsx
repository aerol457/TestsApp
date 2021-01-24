import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

import "./TestDesignView.css";
import Button from "../../../../Core/Button/Button";
import { ModalContext } from "../../../../../context/TeacherContext/ModalContext";

const TestDesignView = () => {
  const [error, setError] = useState(false);
  const modalContext = useContext(ModalContext);
  const testDetails = useSelector((state) => state.test.test);
  const questionsList = useSelector((state) => state.test.questions);

  const handleCancelTest = () => {
    modalContext.showSecondModal();
    modalContext.show();
  };

  const handleAddTest = () => {
    if (testDetails.grade !== 100) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      modalContext.hideSecondModal();
      modalContext.show();
    }
  };

  return (
    <div className="test-details">
      <div className="test-details-content">
        <h6>Test Name:</h6>
        <p>{testDetails.name}</p>
        <h6>Test Profession:</h6>
        <p>{testDetails.professionName}</p>
        <h6>Question Quantity:</h6>
        <p>{questionsList.length}</p>
      </div>
      <div className="test-details-content">
        <h6>Time(minutes):</h6>
        <p>{testDetails.time}</p>
        <h6>Grade:</h6>
        <p>{testDetails.grade}</p>
        <h6>Date of Submitted:</h6>
        <p>{testDetails.dateOfSubmission}</p>
        <Button outlined clicked={handleAddTest}>
          ADD TEST
        </Button>
        <Button clicked={handleCancelTest}>CANCLE TEST</Button>
        <div style={{ height: "20px" }}>
          {error && (
            <p style={{ color: "red" }}>
              Must get test to be equal to 100 score.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDesignView;
