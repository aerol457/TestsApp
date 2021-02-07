import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import "./TestDesign.css";

// import CheckQuestion from "../../../CheckQuestion/CheckQuestion";
// import OptionQuestion from "../../../OptionQuestion/OptionQuestion";
// import ImageQuestion from "../../../ImageQuestion/ImageQuestion";
// import BlankQuestion from "../../../BlankQuestion/BlankQuestion";
import QuestionCard from "../../DesignTest/Options/Questions/Question/Card/Card";
import Modal from "../../../Core/Modal/Modal";
import Backdrop from "../../../Core/Backdrop/Backdrop";
import Button from "../../../Core/Button/Button";
import TestDesignView from "./TestDesignView/TestDesignView";
// import { ModalContext } from "../../../../context/TeacherContext/ModalContext";
import { DashboardContext } from "../../../../context/TeacherContext/DashboardContext";
import {
  updateViewQuestion,
  orderViewQuestion,
  addTest,
  clearTest,
} from "../../../../store/actions/index";

const TestDesign = () => {
  const optionsQuestion = useState([
    {
      name: "Option",
      questionType: "option",
      selected: true,
    },
    {
      name: "Check",
      questionType: "check",
      selected: false,
    },
    {
      name: "Image",
      questionType: "image",
      selected: false,
    },
    {
      name: "Complete",
      questionType: "complete",
      selected: false,
    },
  ])[0];

  const [questionContent, setQuestionContent] = useState({
    position: "",
    content1: "",
    content2: "",
    content3: "",
    answer1: "",
    answer2: "",
    answer3: "",
    option1: "",
    option2: "",
    option3: "",
    value: 0,
    imageUrl: "",
    imageFile: null,
    imageBlob: "",
    isView: true,
    questionType: "option",
  });
  const [partialQuestionList, setPartialQuestionList] = useState([]);
  const perPage = useState(4)[0];
  const [currentLocation, setCurrentLocation] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [submitTest, setSubmitTest] = useState(false);

  // const modalContext = useContext(ModalContext);
  const dashboardContext = useContext(DashboardContext);
  const questionList = useSelector((state) => state.test.questions);
  const testDetails = useSelector((state) => state.test.test);

  const dispatch = useDispatch();

  const handleViewQuestion = (position) => {
    dispatch(
      updateViewQuestion(
        questionList.sort((a, b) => b.position - a.position),
        position
      )
    );
    const question = questionList.find((q) => q.position === position);
    console.log(question);
    setQuestionContent(question);
  };

  const handleRightQuestionViewList = () => {
    const updatedCurrentLocation = currentLocation + perPage;
    let totalPages = Math.floor(questionList.length / perPage);
    let extras = questionList.length % perPage === 0 ? 0 : 1;
    totalPages = totalPages + extras;
    if (updatedCurrentLocation < totalPages * perPage) {
      const updatedPartialList = questionList.slice(
        updatedCurrentLocation,
        updatedCurrentLocation + perPage
      );
      setPartialQuestionList(updatedPartialList);
      setCurrentLocation(updatedCurrentLocation);
    }
  };

  const handleLeftQuestionList = () => {
    const updatedCurrentLocation = currentLocation - perPage;
    if (updatedCurrentLocation >= 0) {
      const updatedPartialList = questionList.slice(
        updatedCurrentLocation,
        currentLocation
      );
      setPartialQuestionList(updatedPartialList);
      setCurrentLocation(updatedCurrentLocation);
    }
  };

  const handleSelectQuestionType = (e) => {
    handleAddNewQuestion(e.target.value);
  };

  const inititalContent = () => {
    let updatedCurrentLocation = currentLocation;
    if (questionList.length <= perPage) {
      updatedCurrentLocation = 0;
    }
    const updatedPartialList = questionList.slice(
      updatedCurrentLocation,
      updatedCurrentLocation + perPage
    );
    setPartialQuestionList(updatedPartialList);
  };

  const handleAddNewQuestion = (type = "option") => {
    setQuestionContent({
      position: "",
      content1: "",
      content2: "",
      content3: "",
      answer1: "",
      answer2: "",
      answer3: "",
      option1: "",
      option2: "",
      option3: "",
      value: 0,
      imageUrl: "",
      imageFile: null,
      imageBlob: "",
      isView: true,
      questionType: type,
    });
  };

  const handleConfirmAddTest = () => {
    testDetails.quantityOfQuestions = questionList.length;
    testDetails.dateOfDistribution = new Date();
    dispatch(
      addTest({
        ...testDetails,
        questionList: questionList,
      })
    );
    // modalContext.cancel();
    dashboardContext.viewTests();
  };

  const handleConfirmCancelTest = () => {
    dispatch(clearTest());
    // modalContext.cancel();
    dashboardContext.viewTests();
  };

  const handleShowModal = (state) => {
    setShowModal(true);
    if (state === "add") {
      setSubmitTest(true);
    } else {
      setSubmitTest(false);
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(orderViewQuestion());
    inititalContent();
  }, [questionContent, questionList, dispatch]);

  return (
    <div className="test">
      {showModal && (
        <div className="test-modal-confirm">
          <Modal show={showModal} clicked={handleCancelModal}>
            <p>
              {submitTest
                ? "You are about to upload your test to your list, Are you confirm?"
                : "You are about to cancel your test and will cause a data lost, Are you confirm?"}
            </p>
            <Button
              clicked={
                submitTest ? handleConfirmAddTest : handleConfirmCancelTest
              }
            >
              CONFIRE
            </Button>
          </Modal>
        </div>
      )}
      <div className="test-config">
        <div className="question-config">
          <select
            className="question-type"
            onChange={(e) => handleSelectQuestionType(e)}
            value={questionContent.questionType}
          >
            {optionsQuestion.map((question, index) => (
              <option key={index} value={question.questionType}>
                {question.name}
              </option>
            ))}
          </select>
          <span>
            <Button outlined clicked={handleAddNewQuestion}>
              NEW QUESTION
            </Button>
          </span>
        </div>
        <div className="config-content">
          <div>
            <TestDesignView />
          </div>
        </div>
        {/*        <div className="config-content">
          {questionContent.questionType === "complete" ? (
            <BlankQuestion
              questionContent={questionContent}
              newQuestion={handleAddNewQuestion}
            />
          ) : questionContent.questionType === "check" ? (
            <CheckQuestion
              questionContent={questionContent}
              newQuestion={handleAddNewQuestion}
            />
          ) : questionContent.questionType === "image" ? (
            <ImageQuestion
              questionContent={questionContent}
              newQuestion={handleAddNewQuestion}
            />
          ) : (
            <OptionQuestion
              questionContent={questionContent}
              newQuestion={handleAddNewQuestion}
            />
          )}
        </div>*/}
      </div>
      <div className="question-lists-view">
        <div className="question-navigation-test-design">
          <IoIosArrowBack
            className="navigate-arrow-test-design"
            onClick={handleLeftQuestionList}
          />
        </div>
        <div className="question-view-layout">
          {questionList.length !== 0 ? (
            partialQuestionList.map((q, i) => {
              return (
                <QuestionCard
                  questionData={q}
                  clicked={handleViewQuestion}
                  key={i}
                  newQuestion={handleAddNewQuestion}
                />
              );
            })
          ) : (
            <p className="question-message-empty">
              Your questions list is empty, You can start to add.
            </p>
          )}
        </div>
        <div className="question-navigation-test-design">
          <IoIosArrowForward
            className="navigate-arrow-test-design"
            onClick={() => handleRightQuestionViewList()}
          />
        </div>
      </div>
    </div>
  );
};

export default TestDesign;
