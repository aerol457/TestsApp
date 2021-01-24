import React from "react";
import { useSelector } from "react-redux";

import "./CardInfo.css";

import Table from "../../Table/Table";

const CardInfo = () => {
  const student = useSelector((state) => state.student.student);

  return (
    <div className="card-container">
      <div className="card-details">
        <div>
          <h1>{student.name}</h1>
          <div className="card-content-details">
            <h6>
              Id Card: <span> {student.idCard}</span>
            </h6>
            <h6>
              Phone Number: <span> {student.phoneNumber}</span>
            </h6>
            <h6>
              City: <span> {student.city}</span>
            </h6>
            <h6>
              Address: <span> {student.address}</span>
            </h6>
          </div>
        </div>
      </div>
      <div className="card-tests">
        <Table />
      </div>
    </div>
  );
};

export default CardInfo;
