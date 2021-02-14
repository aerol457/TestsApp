import React from "react";

import "./Card.css";

import Button from "../../Core/Button/Button";

const Card = ({ clicked, studentInfo }) => {
  return (
    <div className="card-content">
      <div className="card-img">
        <img
          src={`/Images/${
            studentInfo.imageUrl !== "" ? studentInfo.imageUrl : "default.jpg"
          }`}
          alt="profile"
        />
        <Button outlinedWhite clicked={() => clicked(studentInfo)}>
          View Details
        </Button>
      </div>
      <div className="card-name">
        <h5>{studentInfo.name}</h5>
      </div>
    </div>
  );
};

export default Card;
