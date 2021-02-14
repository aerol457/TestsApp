import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Question.css";
import Button from "../../../../../Core/Button/Button";
import Error from "../../../../../Core/Error/Error";
import InputImage from "../../../../../Core/InputImage/InputImage";
import { required, range } from "../../../../../../utils/validators";

import {
  addQuestion,
  updateQuestion,
} from "../../../../../../store/actions/index";

const Question = ({ questionContent, type, saveImage }) => {
  const [position, setPosition] = useState(null);
  const [question, setQuestion] = useState("");
  const [partialQuestion1, setPartialQuestion1] = useState("");
  const [partialQuestion2, setPartialQuestion2] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState(null);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageBlob, setImageBlob] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [value, setValue] = useState(0);
  const [oldValue, setOldValue] = useState(0);
  const [isUpdate, setIsUpdate] = useState(true);
  const [errors, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.test.questions);
  const testDetails = useSelector((state) => state.test.test);

  const onHandleSubmitQuestion = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const questionDetails = {
        position,
        content1: question,
        content2: partialQuestion1,
        content3: partialQuestion2,
        answer1,
        answer2,
        option1,
        option2,
        option3,
        value: +value,
        imageUrl,
        imageBlob,
        questionType: type,
      };
      if (isUpdate) {
        dispatch(updateQuestion(questionDetails));
      } else {
        dispatch(addQuestion(questionDetails));
      }
      if (imageFile) {
        saveImage({ file: imageFile, name: imageUrl });
      }
      initialForm();
    }
  };

  const initialForm = () => {
    setQuestion("");
    setPartialQuestion1("");
    setPartialQuestion2("");
    setAnswer1("");
    setAnswer2("");
    setOption1("");
    setOption2("");
    setOption3("");
    setImageBlob("");
    setImageUrl("");
    setImageFile(null);
    setOldValue(0);
    setValue(0);
    setIsUpdate(false);
    setErrors([false, false, false, false, false, false, false, false]);
  };

  const validateForm = () => {
    const updateErrors = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    let isValid = true;
    if (!required(question)) {
      updateErrors[0] = true;
      isValid = false;
    }

    if (!required(option1)) {
      updateErrors[1] = true;
      isValid = false;
    }

    if (!required(option2)) {
      updateErrors[2] = true;
      isValid = false;
    }

    if (!required(option3)) {
      updateErrors[3] = true;
      isValid = false;
    }

    if (!required(answer1)) {
      updateErrors[4] = true;
      isValid = false;
    }

    if (!required(answer2) && (type === "check" || type === "blank")) {
      updateErrors[5] = true;
      isValid = false;
    }

    if (
      !range({ min: 1, max: 100 })(value) ||
      +testDetails.grade + +value - oldValue > 100
    ) {
      updateErrors[6] = true;
      isValid = false;
    }

    if (imageFile === null && type === "image") {
      updateErrors[7] = true;
      isValid = false;
    }

    setErrors(updateErrors);
    return isValid;
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      console.log(image);
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
    initialForm();
  }, [type]);

  useEffect(() => {
    if (questionContent !== null) {
      setPosition(questionContent.position);
      setQuestion(questionContent.content1);
      setAnswer1(questionContent.answer1);
      setOption1(questionContent.option1);
      setOption2(questionContent.option2);
      setOption3(questionContent.option3);
      setValue(questionContent.value);
      setOldValue(questionContent.value);
      setIsUpdate(true);
      if (type === "image") {
        setImageUrl(questionContent.imageUrl);
        setImageBlob(questionContent.imageBlob);
        setImageFile(questionContent.imageFile);
      } else if (type === "check" || type === "blank") {
        setAnswer2(questionContent.answer2);
      } else if (type === "blank") {
        setPartialQuestion1(questionContent.content2);
        setPartialQuestion2(questionContent.content3);
      }
    } else {
      if (type === "check" || type === "blank") {
        setAnswer2("");

        setIsUpdate(false);
      }
    }
  }, [questionContent]);

  useEffect(() => {
    if (!isUpdate) {
      setPosition(questions.length + 1);
    }
  }, [questions.length, isUpdate]);

  return (
    <form className="question">
      <div>
        <label>Content:</label>
        <input
          className={
            errors[0] ? "question-input question-input-error" : "question-input"
          }
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
        <span>{errors[0] && <Error error="Must fill attribure" />}</span>
      </div>
      {type === "blank" && (
        <React.Fragment>
          <div>
            <label>Content2:</label>
            <input
              className="question-input"
              type="text"
              onChange={(e) => setPartialQuestion1(e.target.value)}
              value={partialQuestion1}
            />
            <span></span>
          </div>
          <div>
            <label>Content3:</label>
            <input
              className="question-input"
              type="text"
              onChange={(e) => setPartialQuestion2(e.target.value)}
              value={partialQuestion2}
            />
            <span></span>
          </div>
        </React.Fragment>
      )}
      <div>
        <label>Option 1:</label>
        <input
          className={
            errors[1] ? "question-input question-input-error" : "question-input"
          }
          type="text"
          onChange={(e) => setOption1(e.target.value)}
          value={option1}
        />
        <span>{errors[1] && <Error error="Must fill attribure" />}</span>
      </div>
      <div>
        <label>Option 2:</label>
        <input
          className={
            errors[2] ? "question-input question-input-error" : "question-input"
          }
          type="text"
          onChange={(e) => setOption2(e.target.value)}
          value={option2}
        />
        <span>{errors[2] && <Error error="Must fill attribure" />}</span>
      </div>
      <div>
        <label>Option 3:</label>
        <input
          className={
            errors[3] ? "question-input question-input-error" : "question-input"
          }
          type="text"
          onChange={(e) => setOption3(e.target.value)}
          value={option3}
        />
        <span>{errors[3] && <Error error="Must fill attribure" />}</span>
      </div>
      <div>
        <label>Answer {(type === "check" || type === "blank") && 1}:</label>
        <input
          className={
            errors[4] ? "question-input question-input-error" : "question-input"
          }
          type="text"
          onChange={(e) => setAnswer1(e.target.value)}
          value={answer1}
        />
        <span>{errors[4] && <Error error="Must fill attribure" />}</span>
      </div>
      {(type === "check" || type === "blank") && (
        <div>
          <label>Answer 2:</label>
          <input
            className={
              errors[5]
                ? "question-input question-input-error"
                : "question-input"
            }
            type="text"
            onChange={(e) => setAnswer2(e.target.value)}
            value={answer2}
          />
          <span>{errors[5] && <Error error="Must fill attribure" />}</span>
        </div>
      )}
      <div>
        <label>Value:</label>
        <input
          className={
            errors[6] ? "question-input question-input-error" : "question-input"
          }
          type="number"
          min="1"
          max="100"
          onChange={(e) => setValue(e.target.value)}
          value={+value}
        />
        <span>
          {errors[6] && (
            <Error error="Value should range between 1 to 100/Grade overload" />
          )}
        </span>
      </div>
      {type === "image" && (
        <div>
          <label>Image: </label>
          <InputImage
            click={showPreview}
            blob={imageBlob}
            defaultImg="defaultQuestion.png"
            isQuestion={true}
            isEmpty={errors[7]}
          />
          <span>{errors[7] && <Error error="Must add file" />}</span>
        </div>
      )}
      <div className="question-btn">
        <Button outlinedWhite clicked={(e) => onHandleSubmitQuestion(e)}>
          {isUpdate ? "UPDATE" : "ADD"} QUESTION
        </Button>
      </div>
    </form>
  );
};

export default Question;
