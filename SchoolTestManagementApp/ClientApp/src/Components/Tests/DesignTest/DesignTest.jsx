import React, { useContext, useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";

import "./DesignTest.css";
import Settings from "./Options/Settings/Settings";
import Questions from "./Options/Questions/Questions";
import Publish from "./Options/PublishClass/PublishClass";
import Overview from "./Options/Overview/Overview";
import uploadIcon from "../../../assets/upload.png";
import uploadWhiteIcon from "../../../assets/upload-white.png";
import overviewIcon from "../../../assets/overview.png";
import overviewWhiteIcon from "../../../assets/overview-white.png";
import { TestDesignDashContext } from "../../../context/TestDesignDashContext";

const DesignTest = () => {
  const testDesignDashContext = useContext(TestDesignDashContext);

  return (
    <div className="test-design">
      <div className="test-design-menu">
        <div className="test-design-layout">
          <div className="test-design-option">
            <div
              className={
                testDesignDashContext.stateDashboard === "settings"
                  ? "test-design-title test-design-title-active"
                  : "test-design-title"
              }
            >
              <span>
                <FiSettings
                  className={
                    testDesignDashContext.stateDashboard === "settings"
                      ? "icon-option icon-option-active"
                      : "icon-option"
                  }
                />
              </span>
              SETTINGS
            </div>
          </div>
          <div className="test-design-option">
            <div
              className={
                testDesignDashContext.stateDashboard === "questions"
                  ? "test-design-title test-design-title-active"
                  : "test-design-title"
              }
            >
              <span>
                <FaRegQuestionCircle
                  className={
                    testDesignDashContext.stateDashboard === "questions"
                      ? "icon-option icon-option-active"
                      : "icon-option"
                  }
                />
              </span>
              QUESTIONS
            </div>
          </div>
          <div className="test-design-option">
            <div
              className={
                testDesignDashContext.stateDashboard === "publish"
                  ? "test-design-title test-design-title-active"
                  : "test-design-title"
              }
            >
              <span>
                <img
                  className="icon-option"
                  src={
                    testDesignDashContext.stateDashboard === "publish"
                      ? uploadIcon
                      : uploadWhiteIcon
                  }
                  alt="Upload"
                />
              </span>
              PUBLISH
            </div>
          </div>
          <div className="test-design-option">
            <div
              className={
                testDesignDashContext.stateDashboard === "overview"
                  ? "test-design-title test-design-title-active"
                  : "test-design-title"
              }
            >
              <span>
                <img
                  className="icon-option"
                  src={
                    testDesignDashContext.stateDashboard === "overview"
                      ? overviewIcon
                      : overviewWhiteIcon
                  }
                  alt="Overview"
                />
              </span>
              OVERVIEW
            </div>
          </div>
        </div>
      </div>
      <div className="test-design-body">
        <div className="test-design-content">
          {testDesignDashContext.stateDashboard === "settings" ? (
            <Settings />
          ) : testDesignDashContext.stateDashboard === "questions" ? (
            <Questions />
          ) : testDesignDashContext.stateDashboard === "publish" ? (
            <Publish />
          ) : (
            <Overview />
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignTest;
