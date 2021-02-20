import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./PublishClass.css";
import Button from "../../../../Core/Button/Button";
import {
  setClassrooms,
  getClassroomByIdTeacher,
} from "../../../../../store/actions/index";
import { TestDesignDashContext } from "../../../../../context/TestDesignDashContext";

const Publish = () => {
  const [class7th, setClass7th] = useState({
    id: 0,
    isAvailable: false,
    isAssign: false,
  });
  const [class8th, setClass8th] = useState({
    id: 0,
    isAvailable: false,
    isAssign: false,
  });
  const [class9th, setClass9th] = useState({
    id: 0,
    isAvailable: false,
    isAssign: false,
  });
  const [class10th, setClass10th] = useState({
    id: 0,
    isAvailable: false,
    isAssign: false,
  });
  const [class11th, setClass11th] = useState({
    id: 0,
    isAvailable: false,
    isAssign: false,
  });
  const [class12th, setClass12th] = useState({
    id: 0,
    isAvailable: false,
    isAssign: false,
  });

  const test = useSelector((state) => state.test.test);
  const classrooms = useSelector((state) => state.test.classrooms);
  const testDesignDashContext = useContext(TestDesignDashContext);
  const dispatch = useDispatch();

  const handleInitialClasses = (classroom) => {
    switch (classroom.name) {
      case "7th":
        return setClass7th({
          id: classroom.id,
          name: classroom.name,
          isAvailable: true,
          isAssign: classroom.isAssign,
        });
      case "8th":
        return setClass8th({
          id: classroom.id,
          name: classroom.name,
          isAvailable: true,
          isAssign: classroom.isAssign,
        });
      case "9th":
        return setClass9th({
          id: classroom.id,
          name: classroom.name,
          isAvailable: true,
          isAssign: classroom.isAssign,
        });
      case "10th":
        return setClass10th({
          id: classroom.id,
          name: classroom.name,
          isAvailable: true,
          isAssign: classroom.isAssign,
        });
      case "11th":
        return setClass11th({
          id: classroom.id,
          name: classroom.name,
          isAvailable: true,
          isAssign: classroom.isAssign,
        });
      case "12th":
        return setClass12th({
          id: classroom.id,
          isAvailable: true,
          isAssign: classroom.isAssign,
        });
      default:
        return;
    }
  };

  const showOverview = () => {
    const classToPublish = [];
    if (class7th.isAvailable) {
      classToPublish.push(class7th);
    }
    if (class8th.isAvailable) {
      classToPublish.push(class8th);
    }
    if (class9th.isAvailable) {
      classToPublish.push(class9th);
    }
    if (class10th.isAvailable) {
      classToPublish.push(class10th);
    }
    if (class11th.isAvailable) {
      classToPublish.push(class11th);
    }
    if (class12th.isAvailable) {
      classToPublish.push(class12th);
    }

    dispatch(setClassrooms(classToPublish));
    testDesignDashContext.viewOverview();
  };

  useEffect(() => {
    if (classrooms) {
      classrooms.forEach((c) => handleInitialClasses(c));
    }
  }, [classrooms]);

  return (
    <div className="publish">
      <h1 className="publish-title">Publish:</h1>
      <div className="publish-list-class">
        {class7th.isAvailable && (
          <label
            className={
              class7th.isAssign
                ? "publish-list-class-item publish-list-class-item-active"
                : "publish-list-class-item"
            }
          >
            <input
              type="checkbox"
              value={class7th}
              onChange={() =>
                setClass7th({ ...class7th, isAssign: !class7th.isAssign })
              }
            />
            7th
          </label>
        )}
        {class8th.isAvailable && (
          <label
            className={
              class8th.isAssign
                ? "publish-list-class-item publish-list-class-item-active"
                : "publish-list-class-item"
            }
          >
            <input
              type="checkbox"
              value={class8th}
              onChange={() =>
                setClass8th({ ...class8th, isAssign: !class8th.isAssign })
              }
            />
            8th
          </label>
        )}
        {class9th.isAvailable && (
          <label
            className={
              class9th.isAssign
                ? "publish-list-class-item publish-list-class-item-active"
                : "publish-list-class-item"
            }
          >
            <input
              type="checkbox"
              value={class9th}
              onChange={() =>
                setClass9th({ ...class9th, isAssign: !class9th.isAssign })
              }
            />
            9th
          </label>
        )}
        {class10th.isAvailable && (
          <label
            className={
              class10th.isAssign
                ? "publish-list-class-item publish-list-class-item-active"
                : "publish-list-class-item"
            }
          >
            <input
              type="checkbox"
              value={class10th}
              onChange={() =>
                setClass10th({ ...class10th, isAssign: !class10th.isAssign })
              }
            />
            10th
          </label>
        )}
        {class11th.isAvailable && (
          <label
            className={
              class11th.isAssign
                ? "publish-list-class-item publish-list-class-item-active"
                : "publish-list-class-item"
            }
          >
            <input
              type="checkbox"
              value={class11th}
              onChange={() =>
                setClass11th({ ...class11th, isAssign: !class11th.isAssign })
              }
            />
            11th
          </label>
        )}
        {class12th.isAvailable && (
          <label
            className={
              class12th.isAssign
                ? "publish-list-class-item publish-list-class-item-active"
                : "publish-list-class-item"
            }
          >
            <input
              type="checkbox"
              value={class12th}
              onChange={() =>
                setClass12th({ ...class12th, isAssign: !class12th.isAssign })
              }
            />
            12th
          </label>
        )}
      </div>
      <div className="publish-btn">
        <Button clicked={testDesignDashContext.viewQuestions}>BACK</Button>
        <Button clicked={showOverview}>OVERVIEW</Button>
      </div>
    </div>
  );
};

export default Publish;
