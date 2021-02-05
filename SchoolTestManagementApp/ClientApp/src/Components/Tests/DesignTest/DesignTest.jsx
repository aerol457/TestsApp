import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { GrFormUpload } from "react-icons/gr";

import "./DesignTest.css";
import Settings from "./Options/Settings/Settings";
import Questions from "./Options/Questions/Questions";
import Publish from "./Options/Publish/Publish";

const DesignTest = () => {
  const [viewDesign, setViewDesign] = useState("settings");

  return (
    <div className="test-design">
      <div className="test-design-menu">
        <div className="test-design-layout">
          <div
            className="test-design-option"
            onClick={() => setViewDesign("settings")}
          >
            <div className="test-design-title">
              <span>
                <FiSettings className="icon-option" />
              </span>
              TEST SETTING
            </div>
          </div>
          <div
            className="test-design-option"
            onClick={() => setViewDesign("questions")}
          >
            <div className="test-design-title">
              <span>
                <FaRegQuestionCircle className="icon-option" />
              </span>
              TEST QUESTIONS
            </div>
          </div>
          <div
            className="test-design-option"
            onClick={() => setViewDesign("publish")}
          >
            <div className="test-design-title">
              <span>
                <GrFormUpload className="icon-option" />
              </span>
              TEST PUBLISH
            </div>
          </div>
          <div>TEST UPDATE</div>
        </div>
      </div>
      <div className="test-design-body">
        <div className="test-design-content">
          {viewDesign === "settings" ? (
            <Settings />
          ) : viewDesign === "questions" ? (
            <Questions />
          ) : (
            <Publish />
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignTest;
