import React from "react";

import "./Switcher.css";

const Switcher = ({ position, clicked }) => {
  return (
    <div className="switcher">
      <label className="toggle-btn">
        <input
          type="checkbox"
          className="checkbox"
          value={position}
          onChange={(e) => clicked(e.target.checked)}
        />
        <div className="ball"></div>
      </label>
    </div>
  );
};

export default Switcher;
