import React, { useContext } from "react";
import { FiSettings } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { GrFormUpload } from "react-icons/gr";

import "./DesignTest.css";
import Settings from "./Options/Settings/Settings";
import Questions from "./Options/Questions/Questions";
import Publish from "./Options/Publish/Publish";
import { TestDesignContext } from "../../../context/TeacherContext/TestDesignContext";

const DesignTest = () => {
  const testDesignContext = useContext(TestDesignContext);

  return (
    <div className="test-design">
      <div className="test-design-menu">
        <div className="test-design-layout">
          <div className="test-design-option">
            <div
              className={
                testDesignContext.stateDashboard === "settings"
                  ? "test-design-title test-design-title-active"
                  : "test-design-title"
              }
            >
              <span>
                <FiSettings className="icon-option" />
              </span>
              TEST SETTING
            </div>
          </div>
          <div className="test-design-option">
            <div
              className={
                testDesignContext.stateDashboard === "questions"
                  ? "test-design-title test-design-title-active"
                  : "test-design-title"
              }
            >
              <span>
                <FaRegQuestionCircle className="icon-option" />
              </span>
              TEST QUESTIONS
            </div>
          </div>
          <div className="test-design-option">
            <div
              className={
                testDesignContext.stateDashboard === "publish"
                  ? "test-design-title test-design-title-active"
                  : "test-design-title"
              }
            >
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
          {testDesignContext.stateDashboard === "settings" ? (
            <Settings />
          ) : testDesignContext.stateDashboard === "questions" ? (
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
