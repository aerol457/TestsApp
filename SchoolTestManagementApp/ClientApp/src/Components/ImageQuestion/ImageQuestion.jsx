import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ImageQuestion.css";
import Button from "../Core/Button/Button";
import TestDesignView from "../Tests/TestCreate/TestDesign/TestDesignView/TestDesignView";
import { addQuestion, updateQuestion } from "../../store/actions/index";

const ImageQuestion = ({ questionContent, newQuestion }) => {
  const [position, setPosition] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageBlob, setImageBlob] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [value, setValue] = useState(0);
  const [oldValue, setOldValue] = useState(0);
  const [isView, setIsView] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.test.questions);
  const testDetails = useSelector((state) => state.test.test);

  const onHandleAddQuestion = (e) => {
    e.preventDefault();
    if (
      question !== "" &&
      answer !== "" &&
      option1 !== "" &&
      option2 !== "" &&
      option3 !== "" &&
      imageUrl !== "" &&
      +value > 0 &&
      +value <= 100 &&
      (+testDetails.grade + +value <= 100 ||
        +testDetails.grade + +value - +oldValue <= 100)
    ) {
      if (!isView) {
        dispatch(
          updateQuestion({
            position: position,
            content1: question,
            answer1: answer,
            option1: option1,
            option2: option2,
            option3: option3,
            imageUrl: imageUrl,
            imageFile: imageFile,
            imageBlob: imageBlob,
            value: +value,
            questionType: "image",
            isView: false,
          })
        );
      } else {
        dispatch(
          addQuestion({
            position: position,
            content1: question,
            answer1: answer,
            option1: option1,
            option2: option2,
            option3: option3,
            imageUrl: imageUrl,
            imageFile: imageFile,
            imageBlob: imageBlob,
            value: +value,
            questionType: "image",
            isView: false,
          })
        );
      }
      newQuestion();
    } else {
      setError(true);
      setTimeout(() => {
        cleanError();
      }, 2000);
    }
  };

  const cleanError = () => {
    setError(false);
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      let fileName = Date.now() + "." + image.name.split(".")[1];
      const localImageUrl = URL.createObjectURL(image);
      setImageBlob(localImageUrl);
      setImageUrl(fileName);
      setImageFile(image);
    } else {
      setImageUrl("");
      setImageFile("");
      setImageBlob("");
    }
  };

  useEffect(() => {
    if (questionContent.position) {
      setPosition(questionContent.position);
    } else {
      setPosition(questions.length + 1);
    }
    setQuestion(questionContent.content1);
    setAnswer(questionContent.answer1);
    setOption1(questionContent.option1);
    setOption2(questionContent.option2);
    setOption3(questionContent.option3);
    setImageUrl(questionContent.imageUrl);
    setImageBlob(questionContent.imageBlob);
    setImageFile(questionContent.imageFile);
    setValue(questionContent.value);
    setOldValue(questionContent.value);
    setIsView(questionContent.isView);
  }, [questionContent, questions.length]);
  return (
    <>
      <div className="image-question-top">
        <form className="image-question-structure">
          <div className="image-question-structure-top">
            <input
              className="image-question-content"
              placeholder="Insert a image question content..."
              type="text"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
            <input
              className="image-question-value"
              type="number"
              min="0"
              max="100"
              placeholder="Insert a value..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </div>
          <div className="image-question-structure-center">
            <div>
              <input
                placeholder="Insert option 1..."
                type="text"
                onChange={(e) => setOption1(e.target.value)}
                value={option1}
              />
              <input
                placeholder="Insert option 2..."
                type="text"
                onChange={(e) => setOption2(e.target.value)}
                value={option2}
              />
              <input
                placeholder="Insert option 3..."
                type="text"
                onChange={(e) => setOption3(e.target.value)}
                value={option3}
              />
            </div>
            <div className="image-question-structure-bottom">
              <input
                type="file"
                accept="image/*"
                className="image-question-file"
                onChange={(e) => showPreview(e)}
              />
              <textarea
                placeholder="Insert answer..."
                type="text"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </div>
          </div>
          <p>
            {error &&
              "Sorry, Must fill all attributes/grade score must no over 100 points."}
          </p>
          <Button outlined clicked={(e) => onHandleAddQuestion(e)}>
            {!isView ? "UPDATE" : "ADD"} QUESTION
          </Button>
        </form>
        <TestDesignView />
      </div>
      <div className="question-image-struct">
        <div className="question-image-header">
          <div className="question-image-content">
            <h5>{position}.</h5>
            <div className="question-image-options">
              <p>
                {question} ({value} POINTS)
              </p>
              <p>1) {answer} (ANSWER)</p>
              <p>2) {option1}</p>
              <p>3) {option2}</p>
              <p>4) {option3}</p>
            </div>
          </div>
        </div>
        <div className="question-image">
          <img
            src={imageBlob === "" ? "/Images/default.png" : imageBlob}
            alt="img question"
          />
        </div>
      </div>
    </>
  );
};

export default ImageQuestion;
