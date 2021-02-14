import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Spinner from "../Core/Spinner/Spinner";

import "./Tests.css";
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

  const handleViewTest = (e, id) => {
    e.stopPropagation();
    dispatch(getTestById(id));
    testDesignDashContext.viewSettings();
    dashboardContext.viewTestDesign();
  };

  const handleStartTest = (e, id) => {
    e.stopPropagation();
    dispatch(startTest(id));
    dashboardContext.viewTest();
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
          <h4 className="test-title">{slice[i].name}</h4>
          <div
            className={
              !slice[i].show
                ? "test-list-item-details"
                : "test-list-item-details show-details"
            }
          >
            <ul>
              <li>
                Id Test:
                <br />
                {slice[i].idTest}
              </li>
              {userDetails.userType === "student" && (
                <li>
                  Teacher Name:
                  <br />
                  {slice[i].idUserNavigation.name}
                </li>
              )}
              <li>
                Quantity of questions:
                <br />
                {slice[i].quantityOfQuestions}
              </li>
              <li>
                Profession Name:
                <br />
                {slice[i].professionName}
              </li>
              <li>
                Time:
                <br />
                {Math.round(+slice[i].time)} min.
              </li>
              <li>
                Created Date:
                <br />
                {
                  slice[i].dateOfDistribution
                    .toString()
                    .replaceAll("-", "/")
                    .split("T")[0]
                }
              </li>
              <li>
                Submitted Date:
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
                  Grade:
                  <br />
                  {slice[i].studentTest[0].grade}
                </li>
              ) : null}
              {userDetails.userType === "teacher" && (
                <li>
                  Passing Grade:
                  <br />
                  {slice[i].passingGrade}
                </li>
              )}
            </ul>
            {isView ? (
              <div className="btn-test">
                {userDetails.userType === "teacher" ? (
                  <Button
                    outlined
                    clicked={(e) => handleViewTest(e, slice[i].id)}
                  >
                    VIEW TEST
                  </Button>
                ) : (
                  <Button
                    outlined
                    clicked={(e) => handleStartTest(e, slice[i].id)}
                  >
                    START TEST
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
    dispatch(initialNewTest());
    testDesignDashContext.viewSettings();
    dashboardContext.viewTestDesign();
  };

  useEffect(() => {
    if (userDetails) {
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
                {postData.length === 0 ? <p>Not tests found...</p> : postData}
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
