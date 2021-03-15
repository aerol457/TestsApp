import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./General.css";
import Button from "../../Core/Button/Button";
import ErrorHandler from "../../../hoc/ErrorHandler/ErrorHandler";
import {
  addClassroom,
  addProfession,
  getAllProfessions,
  getAllClassrooms,
} from "../../../store/actions/index";
import { DashboardContext } from "../../../context/DashboardContext";
const Profession = () => {
  const [input, setInput] = useState("");

  const professions = useSelector((state) => state.general.professions);
  const classrooms = useSelector((state) => state.general.classrooms);
  const dashboardContext = useContext(DashboardContext);
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    if (dashboardContext.stateDashboard === "profession") {
      dispatch(addProfession({ name: input }));
    } else {
      dispatch(addClassroom({ name: input }));
    }
    setInput("");
  };

  useEffect(() => {
    dispatch(getAllProfessions());
    dispatch(getAllClassrooms());
  }, []);

  return (
    <div className="general-layout">
      <h1>General:</h1>
      <div className="general-content">
        <h4>
          {dashboardContext.stateDashboard === "profession"
            ? "Professions:"
            : "Classrooms:"}
        </h4>
        <form>
          <div>
            <label className="general-content-block">Name:</label>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <span className="general-content-block">
              <strong>Insert a name to create</strong>
            </span>
          </div>
          <Button outlined clicked={handleCreate}>
            CREATE
          </Button>
        </form>
        <div className="general-list">
          {dashboardContext.stateDashboard === "profession" ? (
            <ul>
              {professions.map((p, i) => (
                <li key={i}>{p.name}</li>
              ))}
            </ul>
          ) : (
            <ul>
              {classrooms.map((c, i) => (
                <li key={i}>{c.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler(Profession, axios);
