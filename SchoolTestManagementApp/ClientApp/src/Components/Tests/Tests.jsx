import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Spinner from "../Core/Spinner/Spinner";

import "./Tests.css";
import Button from "../Core/Button/Button";
import Backdrop from "../Core/Backdrop/Backdrop";
import Modal from "../Core/Modal/Modal";
import TestCreate from "./TestCreate/TestCreate";
// import ErrorMessage from "../Core/HandleError/HandleError";
import { ModalContext } from "../../context/TeacherContext/ModalContext";
import { DashboardContext } from "../../context/TeacherContext/DashboardContext";
import {
  getAllTest,
  findMyTests,
  clearTest,
  getTestById,
  initGeneral,
} from "../../store/actions/index";

const Tests = () => {
  const [pageCount, setPageCount] = useState(0);
  const setCurrentPage = useState(0)[1];
  const [offset, setOffset] = useState(0);
  const perPage = useState(7)[0];
  const [postData, setPostData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const userDetails = useSelector((state) => state.auth.userProfile);
  const allTests = useSelector((state) => state.test.tests);
  const tests = useSelector((state) => state.test.search);
  const error = useSelector((state) => state.test.error);
  const loading = useSelector((state) => state.test.loading);
  const modalContext = useContext(ModalContext);
  const dashboardContext = useContext(DashboardContext);
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
          <h4>{slice[i].name}</h4>
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
              {userDetails.userType === "student" && (
                <li>
                  Grade:
                  <br />
                  {slice[i].studentTest[0].grade}
                </li>
              )}
            </ul>
            {isView && (
              <div className="btn-test">
                <Button
                  outlinedWhite
                  clicked={(e) => handleViewTest(e, slice[i].id)}
                >
                  {userDetails.userType === "teacher"
                    ? "VIEW TEST"
                    : "START TEST"}
                </Button>
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
    dispatch(findMyTests(searchInput, allTests));
  };

  useEffect(() => {
    console.log("tests1");
    dispatch(getAllTest(userDetails));
  }, [getAllTest, userDetails]);

  useEffect(() => {
    console.log("tests2");
    receivedData();
    dispatch(clearTest());
    dispatch(initGeneral());
  }, [tests, error, allTests, clearTest]);

  return (
    <React.Fragment>
      {modalContext.stateModal && (
        <>
          <Backdrop />
          <Modal>
            <TestCreate />
          </Modal>
        </>
      )}

      <div className="dashboard-content-center-top">
        <div className="dashboard-content-center-top-search">
          <form onSubmit={(event) => onHandleSearchClick(event)}>
            <label>ID:</label>
            <input
              type="text"
              placeholder="Insert Id to search.."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <Button>SEARCH</Button>
          </form>
          <div className="student-search-error">
            {/*{error && <ErrorMessage>{error}</ErrorMessage>}*/}
          </div>
        </div>
        <div className="dashboard-content-center-top-btn">
          {userDetails.userType === "teacher" && (
            <Button clicked={modalContext.show} outlined>
              +ADD
            </Button>
          )}
        </div>
      </div>

      <div className="dashboard-content-center-bottom">
        {loading ? (
          <Spinner />
        ) : (
          <ul className="test-list">
            {postData.length === 0 ? <p>Not tests found...</p> : postData}
          </ul>
        )}
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
      </div>
    </React.Fragment>
  );
};

export default Tests;
