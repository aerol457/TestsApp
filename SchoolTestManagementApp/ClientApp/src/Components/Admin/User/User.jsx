import React, { useContext, useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import "./User.css";
import { DashboardContext } from "../../../context/DashboardContext";
import {
  getInitUserClass,
  addTeacherClass,
  removeTeacherClass,
  getAllClassrooms,
  actionResetAdmin,
} from "../../../store/actions/index";
import Search from "../../Search/Search";

const Teacher = () => {
  const [classroom, setClassroom] = useState({});
  const [connectedClassroom, setConnectedClassroom] = useState([]);
  const [unConnectedClassroom, setUnConnectedClassroom] = useState([]);
  const [inputId, setInputId] = useState("");

  const allClassrooms = useSelector((state) => state.general.classrooms);
  const teacherClass = useSelector((state) => state.admin.teacherClass);
  const teacherDetails = useSelector((state) => state.admin.teacherDetails);
  const error = useSelector((state) => state.admin.error);
  const dispatch = useDispatch();
  const dashboardContext = useContext(DashboardContext);

  const handleInsertIdCard = (e) => {
    e.preventDefault();
    dispatch(
      getInitUserClass(inputId, allClassrooms, dashboardContext.stateDashboard)
    );
    setInputId("");
  };

  const handleAddClassroom = (e) => {
    e.preventDefault();
    dispatch(
      addTeacherClass({ id: teacherDetails.id, idClassroom: classroom.id })
    );
  };

  const handleRemoveClass = (e, id) => {
    e.preventDefault();
    dispatch(removeTeacherClass({ id: teacherDetails.id, idClassroom: id }));
  };

  const handleSetInputSearch = (event) => {
    setInputId(event.target.value);
  };

  const handleSetClassroom = (event) => {
    let updateClass = event.target.value.split("-");
    setClassroom({
      id: updateClass[1],
      name: updateClass[0],
    });
  };

  useEffect(() => {
    dispatch(getAllClassrooms());
    return () => dispatch(actionResetAdmin());
  }, []);

  useEffect(() => {
    if (teacherClass.length !== 0) {
      let initClass = null;
      teacherClass.forEach((c) => {
        if (!c.isAssign && initClass === null) {
          initClass = {
            id: c.id,
            name: c.name,
          };
        }
      });
      setClassroom(initClass);
    }
  }, [teacherClass]);

  useEffect(() => {
    if (teacherClass) {
      const updatedViewConnectClass = [];
      const updatedViewUnConnectClass = [];
      teacherClass.forEach((c) => {
        if (c.isAssign) {
          updatedViewConnectClass.push(c);
        } else {
          updatedViewUnConnectClass.push(c);
        }
      });
      setConnectedClassroom(updatedViewConnectClass);
      setUnConnectedClassroom(updatedViewUnConnectClass);
    }
  }, [teacherClass]);

  return (
    <div className="teacher-managment-layout">
      <div className="teacher-managment-data">
        <Search
          submitForm={handleInsertIdCard}
          input={inputId}
          setInput={handleSetInputSearch}
          error={error}
        />
      </div>
      {teacherDetails && (
        <>
          <div className="teacher-managment-data">
            <div className="teacher-input-classrooms">
              <select onChange={handleSetClassroom}>
                {unConnectedClassroom.map((c, i) => (
                  <option key={i} value={`${c.name}-${c.id}`}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span>
                <strong>Click the arrow button to make a connection</strong>
              </span>
            </div>
          </div>
          <div className="teacher-managment-view">
            <div className="teacher-card">
              <div className="teacher-card-top">
                <img src={`/Images/${teacherDetails.imageUrl}`} />
                <div className="teacher-card-top-right">
                  <h4>{teacherDetails.name}</h4>
                  <h6>
                    {dashboardContext.stateDashboard === "teacher"
                      ? teacherDetails.idProfessionNavigation.name
                      : null}
                  </h6>
                </div>
              </div>
              <div className="teacher-card-bottom">
                <p>Id: {teacherDetails.idCard}</p>
                <p>City: {teacherDetails.city}</p>
                <p>Address: {teacherDetails.address}</p>
                <p style={{ textTransform: "none" }}>
                  E-Mail: {teacherDetails.email}
                </p>
              </div>
            </div>

            <div className="teacher-view-change-icon">
              <span>
                <FaArrowCircleRight
                  className={
                    unConnectedClassroom.length === 0
                      ? "classrooms-empty-btn"
                      : null
                  }
                  onClick={handleAddClassroom}
                />
              </span>
            </div>

            <div className="classroom-card">
              <div className="classroom-card-value">
                <span>
                  {unConnectedClassroom.length > 0 ? (
                    classroom.name
                  ) : (
                    <p className="classrooms-empty-list">Max Connections</p>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="teacher-management-details">
            <h4>
              {dashboardContext.stateDashboard === "teacher"
                ? "Connected Classrooms"
                : "Connected Classroom"}
            </h4>
            {connectedClassroom.length > 0 ? (
              <ul>
                {connectedClassroom.map((c, i) => (
                  <li key={i}>
                    {c.name}
                    {dashboardContext.stateDashboard === "teacher" && (
                      <span>
                        <MdCancel onClick={(e) => handleRemoveClass(e, c.id)} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="classrooms-empty-list">Not have connections yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Teacher;
