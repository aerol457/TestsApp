import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { FiArchive } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";

import "./Tests.css";
import Spinner from "../Core/Spinner/Spinner";
import Button from "../Core/Button/Button";
import Search from "../Search/Search";
import { DashboardContext } from "../../context/DashboardContext";
import {
  getAllTest,
  findMyTests,
  getTestById,
  resetErrorTest,
  initialNewTest,
  startTest,
  clearTests,
  cancelTest,
} from "../../store/actions/index";
import { TestDesignDashContext } from "../../context/TestDesignDashContext";

const Tests = () => {
  const [pageCount, setPageCount] = useState(0);
  const setCurrentPage = useState(0)[1];
  const [offset, setOffset] = useState(0);
  const perPage = useState(7)[0];
  const [postData, setPostData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const userDetails = useSelector((state) => state.auth.userProfile);
  const tests = useSelector((state) => state.test.tests);
  const error = useSelector((state) => state.test.error);
  const loading = useSelector((state) => state.test.loading);
  const dashboardContext = useContext(DashboardContext);
  const testDesignDashContext = useContext(TestDesignDashContext);
  const dispatch = useDispatch();

  const onToggleTestDetails = (index, dataSlice) => {
    Object.keys(dataSlice).map((i) => {
      if (i === index) {
        return (dataSlice[i].show = !dataSlice[i].show);
      }
      return (dataSlice[i].show = false);
    });
    designList(dataSlice);
  };

  const receivedData = (updatedOffset = offset) => {
    const slice = tests.slice(updatedOffset, updatedOffset + perPage);
    designList(slice);
  };

  const handleUpdateTest = (e, id) => {
    e.stopPropagation();
    dispatch(getTestById(id));
    dispatch(clearTests());
    dashboardContext.viewTestDesign();
    testDesignDashContext.viewSettings();
  };

  const handleViewTest = (e, id) => {
    e.stopPropagation();
    dispatch(getTestById(id));
    dispatch(clearTests());
    dashboardContext.viewTestDesign();
    testDesignDashContext.viewOverview();
  };

  const handleStartTest = (e, id) => {
    e.stopPropagation();
    dispatch(startTest(id));
    localStorage.setItem("startTest", "init");
    dashboardContext.viewTest();
  };

  const handleCancelTest = (e, idTest) => {
    e.stopPropagation();
    dispatch(cancelTest(idTest));
  };

  const designList = (slice) => {
    const postDataView = Object.keys(slice).map((i) => {
      let isView = true;
      if (
        slice[i].studentTest.length > 0 &&
        userDetails.userType === "student"
      ) {
        const currentDate = new Date();
        const submmitedDate = new Date(slice[i].dateOfSubmission);
        const isValid = currentDate > submmitedDate;
        if (slice[i].studentTest[0].isDone || isValid) {
          isView = false;
        }
      }
      let button = (
        <Button outlined clicked={(e) => handleViewTest(e, slice[i].id)}>
          OVERVIEW
        </Button>
      );
      if (!slice[i].isAccess && !slice[i].archive) {
        button = (
          <Button outlined clicked={(e) => handleUpdateTest(e, slice[i].id)}>
            UPDATE
          </Button>
        );
      }

      return (
        <li
          className={
            slice[i].show
              ? "test-list-item test-list-item-show"
              : "test-list-item"
          }
          key={i}
          onClick={() => onToggleTestDetails(i, slice)}
        >
          <div className="test-list-header">
            <h4 className="test-title">{slice[i].name}</h4>
            {slice[i].show && userDetails.userType === "teacher" ? (
              <div
                className={
                  slice[i].show && (slice[i].isCancel || slice[i].archive)
                    ? "test-archive-enabled"
                    : slice[i].show
                    ? "test-archive"
                    : "test-archive-enabled"
                }
                onClick={(e) => handleCancelTest(e, slice[i].id)}
              >
                <span className="test-archive-icon">
                  <RiDeleteBin6Line />
                </span>
                <span className="test-archive-text">Delete</span>
              </div>
            ) : !slice[i].isAccess &&
              !slice[i].archive &&
              userDetails.userType === "teacher" ? (
              <span className="test-state-icon-update">
                <MdUpdate />
              </span>
            ) : slice[i].isCancel && userDetails.userType === "teacher" ? (
              <span className="test-state-icon-update">
                <GiCancel />
              </span>
            ) : slice[i].archive && userDetails.userType === "teacher" ? (
              <span className="test-state-icon-archive">
                <FiArchive />
              </span>
            ) : (!slice[i].archive && userDetails.userType === "teacher") ||
              ((slice[i].studentTest[0].isDone || slice[i].archive) &&
                userDetails.userType === "student") ? (
              <span className="test-state-icon-check">
                <AiOutlineCheckCircle />
              </span>
            ) : (
              <span className="test-state-icon-update">
                <GiCancel />
              </span>
            )}
          </div>
          <div
            className={
              !slice[i].show
                ? "test-list-item-details"
                : "test-list-item-details show-details"
            }
          >
            {userDetails.userType === "teacher" &&
            slice[i].show &&
            slice[i].isCancel ? (
              <div className="archive-title">
                <span>CANCELED</span>
              </div>
            ) : userDetails.userType === "teacher" &&
              slice[i].show &&
              slice[i].archive ? (
              <div className="archive-title">
                <span>ARCHIVED</span>
              </div>
            ) : null}
            <ul>
              <li>
                <span className="test-details-title">Id:</span>
                <br />
                {slice[i].idTest}
              </li>
              {userDetails.userType === "student" && (
                <li>
                  <span className="test-details-title">Teacher Name:</span>
                  <br />
                  {slice[i].teacherName}
                </li>
              )}
              <li>
                <span className="test-details-title">
                  Quantity of questions:
                </span>
                <br />
                {slice[i].quantityOfQuestions}
              </li>
              <li>
                <span className="test-details-title">Profession:</span>
                <br />
                {slice[i].professionName}
              </li>
              <li>
                <span className="test-details-title">Time:</span>
                <br />
                {Math.round(+slice[i].time)} min.
              </li>
              <li>
                <span className="test-details-title">Created Date:</span>
                <br />
                {
                  slice[i].dateOfDistribution
                    .toString()
                    .replaceAll("-", "/")
                    .split("T")[0]
                }
              </li>
              <li>
                <span className="test-details-title">Submitted Date:</span>
                <br />
                {
                  slice[i].dateOfSubmission
                    .toString()
                    .replaceAll("-", "/")
                    .split("T")[0]
                }
              </li>
              {userDetails.userType === "student" &&
              slice[i].studentTest[0].isDone ? (
                <li>
                  <span className="test-details-title">Grade:</span>
                  <br />
                  {slice[i].studentTest[0].grade}
                </li>
              ) : null}
              {userDetails.userType === "teacher" && (
                <li>
                  <span className="test-details-title">Passing Grade:</span>
                  <br />
                  {slice[i].passingGrade}
                </li>
              )}
            </ul>
            {isView ? (
              <div className="btn-test">
                {userDetails.userType === "teacher" ? (
                  button
                ) : (
                  <Button
                    outlined
                    clicked={(e) => handleStartTest(e, slice[i].id)}
                  >
                    START
                  </Button>
                )}
              </div>
            ) : (
              <div>
                {slice[i].studentTest[0].isPass ? (
                  <span className="test-grade-state-pass">PASS</span>
                ) : (
                  <span className="test-grade-state-fail">FAIL</span>
                )}
              </div>
            )}
          </div>
        </li>
      );
    });
    setPageCount(Math.ceil(tests.length / perPage));
    setPostData(postDataView);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(offset);
    receivedData(offset);
  };

  const onHandleSearchClick = (event) => {
    event.preventDefault();
    dispatch(findMyTests(searchInput, userDetails));
  };

  const handleSetInputSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleAddTest = () => {
    dispatch(initialNewTest(userDetails));
    testDesignDashContext.viewSettings();
    dashboardContext.viewTestDesign();
  };

  useEffect(() => {
    if (userDetails && tests.length === 0) {
      dispatch(getAllTest(userDetails));
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails.userType === "student") {
      dispatch(getAllTest(userDetails));
    }
  }, [userDetails]);

  useEffect(() => {
    receivedData();
  }, [tests]);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        dispatch(resetErrorTest());
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="tests-layout">
      <div className="tests-top">
        <div className="tests-top-search">
          <Search
            submitForm={onHandleSearchClick}
            input={searchInput}
            setInput={handleSetInputSearch}
            error={error}
          />
        </div>
      </div>

      <div className="tests-bottom">
        <div className="tests-bottom-layout">
          <div className="tests-bottom-top">
            {userDetails.userType === "teacher" && (
              <div className="tests-add-btn">
                <Button clicked={handleAddTest} outlined>
                  +ADD
                </Button>
              </div>
            )}
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <ul className="test-list">
                {postData.length === 0 ? (
                  <p>Your tests list is empty</p>
                ) : (
                  postData
                )}
              </ul>
              <div className="pagination-content">
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={(event) => handlePageClick(event)}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tests;
