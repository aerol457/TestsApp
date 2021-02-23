import React, { useEffect, useState } from "react";

import "./General.css";
import Button from "../../Core/Button/Button";
import {
  addClassroom,
  addProfession,
  getAllProfessions,
  getAllClassrooms,
} from "../../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
const Profession = () => {
  const [profession, setProfession] = useState("");
  const [classroom, setClassroom] = useState("");

  const professions = useSelector((state) => state.general.professions);
  const classrooms = useSelector((state) => state.general.classrooms);
  const dispatch = useDispatch();

  const handleCreateProfession = (e) => {
    e.preventDefault();
    dispatch(addProfession({ name: profession }));
    setProfession("");
  };

  const handleCreateClassroom = (e) => {
    e.preventDefault();
    dispatch(addClassroom({ name: classroom }));
    setClassroom("");
  };

  useEffect(() => {
    dispatch(getAllProfessions());
    dispatch(getAllClassrooms());
  }, []);

  return (
    <div className="general-content">
      <h1>General:</h1>
      <div className="general-layout">
        <div className="general-part">
          <div className="general-part-content">
            <h4>Profession:</h4>
            <form>
              <div>
                <label>Name:</label>
                <input
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
                <span>
                  <strong>Insert a name to create</strong>
                </span>
              </div>
              <Button outlined clicked={handleCreateProfession}>
                CREATE
              </Button>
            </form>
            <div className="general-list">
              <ul>
                {professions.map((p, i) => (
                  <li key={i}>{p.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="general-part">
          <div className="general-part-content">
            <h4>Classroom:</h4>
            <form>
              <div>
                <label>Name:</label>
                <input
                  value={classroom}
                  onChange={(e) => setClassroom(e.target.value)}
                />
                <span>
                  <strong>Insert a name to create</strong>
                </span>
              </div>
              <Button outlined clicked={handleCreateClassroom}>
                CREATE
              </Button>
            </form>
            <div className="general-list">
              <ul>
                {classrooms.map((c, i) => (
                  <li key={i}>{c.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profession;
