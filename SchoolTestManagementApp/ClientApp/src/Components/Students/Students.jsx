import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "./Students.css";

import Modal from "../../Components/Core/Modal/Modal";
import Backdrop from "../../Components/Core/Backdrop/Backdrop";
import Button from "../../Components/Core/Button/Button";
import ErrorMessage from "../Core/ErrorMessage/ErrorMessage";
import Card from "../Core/Card/Card";
import Spinner from "../Core/Spinner/Spinner";
import CardInfo from "../Core/Card/CardInfo/CardInfo";
import { ModalContext } from "../../context/TeacherContext/ModalContext";
import {
  getAllStudentsByIdTeacher,
  getAllTestsByIdStudent,
  clearStudentAndTests,
} from "../../store/actions/index";

const Students = () => {
  const [postData, setPostData] = useState([]);
  const setPartionData = useState([])[1];
  const [offset, setOffset] = useState(12);
  const [rightDisable, setRightDisable] = useState(false);
  const [leftDisable, setLeftDisable] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(false);
  const perPage = useState(12)[0];
  const students = useSelector((state) => state.student.students);
  const loading = useSelector((state) => state.student.loading);
  const modalContext = useContext(ModalContext);
  const dispatch = useDispatch();

  const onShowDetails = (studentInfo) => {
    dispatch(getAllTestsByIdStudent(studentInfo));
    modalContext.show();
  };

  const designPageCard = (slice, range = offset) => {
    const postDataView = Object.keys(slice).map((i, index) => (
      <Card key={index} clicked={onShowDetails} studentInfo={slice[i]} />
    ));
    setPostData(postDataView);
    setPartionData(slice);
    setOffset(range);
  };

  const handlePageClick = (side) => {
    let partionStudents = [];
    let range = offset;
    if (side === "right" && range < students.length && range !== 1) {
      range = range + perPage;
      partionStudents = students.slice(offset, offset + perPage);
      designPageCard(partionStudents, range);
      if (range >= students.length) {
        setLeftDisable(false);
        setRightDisable(true);
      }
    } else if (side === "left" && range - perPage !== 0 && range !== 1) {
      range = range - perPage;
      partionStudents = students.slice(
        offset - perPage - perPage,
        offset - perPage
      );
      designPageCard(partionStudents, range);
      if (range === perPage) {
        setLeftDisable(true);
        setRightDisable(false);
      }
    }
  };

  const onHandleSearchClick = (event) => {
    event.preventDefault();
    const filteredData = students.filter(
      (student) => student.id === +searchInput
    );
    if (filteredData.length === 0) {
      setSearchInput("");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      designPageCard(students.slice(0, perPage), 12);
      setLeftDisable(true);
      setRightDisable(false);
    } else {
      designPageCard(filteredData, 1);
      setLeftDisable(true);
      setRightDisable(true);
    }
  };

  const onHandlerInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllStudentsByIdTeacher());
  }, [getAllStudentsByIdTeacher]);

  useEffect(() => {
    designPageCard(students.slice(0, perPage));
  }, [students]);

  useEffect(() => {
    !modalContext.stateModal && dispatch(clearStudentAndTests());
  }, [modalContext.stateModal]);
  return (
    <div className="students-content">
      {modalContext.stateModal && (
        <div>
          <Backdrop />
          <Modal>
            <CardInfo />
          </Modal>
        </div>
      )}
      <form
        className="students-search"
        onSubmit={(event) => onHandleSearchClick(event)}
      >
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            placeholder="Insert Id to search.."
            onChange={(event) => onHandlerInputChange(event)}
            value={searchInput}
          />
          <Button>SEARCH</Button>
        </div>
        <div className="student-search-error">
          {error && <ErrorMessage>Sorry, Can't find student</ErrorMessage>}
        </div>
      </form>
      {postData.length === 0 ? (
        <p
          style={{
            margin: "6vh 0 0 2vw",
            "font-size": "30px",
            "font-weight": "400",
          }}
        >
          Sorry, Not found students are related.
        </p>
      ) : (
        <div className="student-layout">
          <div className="navigate-students">
            <button
              className={
                leftDisable ? "navigate-btn disable-btn" : "navigate-btn"
              }
            >
              <IoIosArrowBack onClick={() => handlePageClick("left")} />
            </button>
          </div>
          <div className="students-cards">
            {loading ? <Spinner /> : postData}
          </div>
          <div className="navigate-students">
            <button
              className={
                rightDisable ? "navigate-btn disable-btn" : "navigate-btn"
              }
            >
              <IoIosArrowForward onClick={() => handlePageClick("right")} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
