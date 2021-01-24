import React from "react";

import "./Card.css";

import Button from "../Button/Button";

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
        <Button outlined clicked={() => clicked(studentInfo)}>
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
