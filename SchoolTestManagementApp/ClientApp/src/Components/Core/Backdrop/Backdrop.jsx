import React from "react";

import "./Backdrop.css";

const Backdrop = ({ clicked }) => {
  return <div className="backdrop" onClick={clicked}></div>;
};

export default Backdrop;
