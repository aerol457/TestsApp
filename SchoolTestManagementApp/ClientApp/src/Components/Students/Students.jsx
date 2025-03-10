import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "./Students.css";

import Modal from "../Core/Modal/Modal";
import Card from "./Card/Card";
import Spinner from "../Core/Spinner/Spinner";
import CardInfo from "./Card/CardInfo/CardInfo";
import {
  getAllStudentsByIdTeacher,
  getAllTestsByIdStudent,
  clearStudentAndTests,
  searchStudent,
  resetErrorStudent,
} from "../../store/actions/index";
import Search from "../Search/Search";

const Students = () => {
  const [searchInput, setSearchInput] = useState("");
  const [postData, setPostData] = useState([]);
  const perPage = useState(12)[0];
  const [offset, setOffset] = useState(perPage);
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const students = useSelector((state) => state.student.students);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const loading = useSelector((state) => state.student.loading);
  const error = useSelector((state) => state.student.error);
  const dispatch = useDispatch();

  const handleNextStudents = () => {
    let updatePage = page + 1;
    if (updatePage <= totalPages) {
      let updateOffset = offset + perPage;
      setOffset(updateOffset);
      setPage(updatePage);
      setPosition(position + 1);
    }
  };

  const handlePrevStudents = () => {
    let updatePage = page - 1;
    if (updatePage >= 0) {
      let updateOffset = offset - perPage;
      setOffset(updateOffset);
      setPage(updatePage);
      setPosition(position - 1);
    }
  };

  const onHandleSearchClick = (event) => {
    event.preventDefault();
    dispatch(searchStudent(searchInput));
  };

  const handlerInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleShowModal = (studentInfo) => {
    dispatch(getAllTestsByIdStudent(studentInfo, "teacher"));
    setShowModal(true);
  };

  const handleCancelModal = () => {
    dispatch(clearStudentAndTests());
    setShowModal(false);
  };

  const designPageCard = (sortType) => {
    let currentStudents = [...students];
    if (+sortType !== 0) {
      currentStudents = students.filter((s) => s.idClassroom === +sortType);
    }
    const start = perPage * position;
    const slice = currentStudents.slice(start, offset);
    const postDataView = Object.keys(slice).map((i, index) => (
      <Card key={index} clicked={handleShowModal} studentInfo={slice[i]} />
    ));
    setPostData(postDataView);
  };

  useEffect(() => {
    dispatch(getAllStudentsByIdTeacher());
  }, [getAllStudentsByIdTeacher]);

  useEffect(() => {
    if (students) {
      designPageCard(0);
    }
    if (totalPages === 0) {
      let pages = 0;
      let extras = 0;
      pages = Math.round(students.length / perPage);
      if (pages !== 0) {
        extras = students.length % perPage;
      } else {
        pages = 1;
      }
      setTotalPages(pages + extras);
    }
  }, [students, page]);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        dispatch(resetErrorStudent());
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    dispatch(clearStudentAndTests());
  }, []);

  return (
    <div className="students-content">
      {showModal && (
        <Modal clicked={handleCancelModal} show={showModal}>
          <CardInfo />
        </Modal>
      )}

      <div className="students-top">
        <div className="students-top-search">
          <Search
            input={searchInput}
            setInput={handlerInputChange}
            submitForm={onHandleSearchClick}
            error={error}
          />
        </div>
        <div className="students-sort-by-class">
          <label>Sort by:</label>
          <select
            className="students-sort-by-class-select"
            onChange={(e) => designPageCard(e.target.value)}
          >
            <option value={0}>All</option>
            {userProfile.classrooms.map((c, i) => (
              <option key={i} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {postData.length === 0 ? (
        <p className="students-related-empty">
          Sorry, Not found students are related
        </p>
      ) : (
        <div className="student-layout">
          <div className="navigate-students">
            <button
              className={
                page === 1 ? "navigate-btn disable-btn" : "navigate-btn"
              }
            >
              <IoIosArrowBack onClick={handlePrevStudents} />
            </button>
          </div>
          <div className="students-cards">
            {loading ? <Spinner /> : postData}
          </div>
          <div className="navigate-students">
            <button
              className={
                page === totalPages
                  ? "navigate-btn disable-btn"
                  : "navigate-btn"
              }
            >
              <IoIosArrowForward onClick={handleNextStudents} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
