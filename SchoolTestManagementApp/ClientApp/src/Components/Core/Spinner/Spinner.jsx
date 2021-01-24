import React from "react";
import SpinnerDesign from "react-bootstrap/Spinner";

import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-content">
      <SpinnerDesign animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </SpinnerDesign>
    </div>
  );
};

export default Spinner;
