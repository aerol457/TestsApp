import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";

import "./Question.css";
import Button from "../../../../../Core/Button/Button";
import blankOption1 from "../../../../../../assets/blankOption1.png";
import blankOption2 from "../../../../../../assets/blankOption2.png";
import blankOption3 from "../../../../../../assets/blankOption3.png";
import Error from "../../../../../Core/Error/Error";
import InputImage from "../../../../../Core/InputImage/InputImage";
import { required, range } from "../../../../../../utils/validators";

import {
  addQuestion,
  updateQuestion,
  updateTestQuantity,
} from "../../../../../../store/actions/index";

const Question = ({ questionContent, type, index }) => {
  const [id, setId] = useState(0);
  const [question, setQuestion] = useState("");
  const [partialQuestion1, setPartialQuestion1] = useState("");
  const [partialQuestion2, setPartialQuestion2] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [defaultImage, setDefaultImage] = useState("defaultQuestion.png");
  const [blankType, setBlankType] = useState(0);
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
    false,
    false,
  ]);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.test.questions);
  const testDetails = useSelector((state) => state.test.test);

  const onHandleSubmitQuestion = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      var questionForm = new FormData();
      questionForm.append("id", id);
      questionForm.append("content1", question);
      questionForm.append("answer1", answer1);
      questionForm.append("option1", option1);
      questionForm.append("option2", option2);
      questionForm.append("option3", option3);
      questionForm.append("value", +value);
      questionForm.append("questionType", type);
      questionForm.append("idTest", testDetails.id);

      if (type === "check" || type === "blank") {
        questionForm.append("answer2", answer2);
      }

      if (type === "image") {
        questionForm.append("imageUrl", imageUrl);
        questionForm.append("imageFile", imageFile);
        questionForm.append("currentImage", defaultImage);
      }

      if (type === "blank") {
        questionForm.append("blankType", blankType);
        questionForm.append("content2", partialQuestion1);
        if (blankType === 0) {
          questionForm.append("content3", partialQuestion2);
        }
      }

      if (isUpdate) {
        dispatch(updateQuestion(questionForm, index));
      } else {
        dispatch(addQuestion(questionForm));
        const test = { ...testDetails };
        test.quantityOfQuestions += 1;
        dispatch(updateTestQuantity(test));
      }
      initialForm();
    }
  };

  const initialForm = () => {
    setId(0);
    setQuestion("");
    setPartialQuestion1("");
    setPartialQuestion2("");
    setAnswer1("");
    setAnswer2("");
    setOption1("");
    setOption2("");
    setOption3("");
    setImageUrl(null);
    setImageFile(null);
    setImageBlob(null);
    setDefaultImage("defaultQuestion.png");
    setOldValue(0);
    setValue(0);
    setIsUpdate(false);
    setErrors([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
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
      false,
      false,
    ];
    let isValid = true;
    if (!required(question)) {
      updateErrors[0] = true;
      isValid = false;
    }
    if (type === "blank") {
      if (!required(partialQuestion1)) {
        updateErrors[8] = true;
        isValid = false;
      }
      if (blankType === 0) {
        if (!required(partialQuestion2)) {
          updateErrors[9] = true;
          isValid = false;
        }
      }
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
    if ((type === "check" || type === "blank") && !required(answer2)) {
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

    if (imageUrl === "" && type === "image") {
      updateErrors[7] = true;
      isValid = false;
    }

    setErrors(updateErrors);
    return isValid;
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      let fileName = Date.now() + "." + image.name.split(".")[1];
      const localImageUrl = URL.createObjectURL(image);
      setImageUrl(fileName);
      setImageFile(image);
      setImageBlob(localImageUrl);
      e.target.value = "";
    } else {
      setImageUrl(null);
      setImageFile(null);
      setImageBlob(null);
    }
  };

  const handleChooseBlankType = (type) => {
    setBlankType(type);
    if (type !== 0) {
      setPartialQuestion2("");
    }
  };

  useEffect(() => {
    initialForm();
  }, [type, questions.length]);

  useEffect(() => {
    if (questionContent !== null) {
      setId(questionContent.id);
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
        setDefaultImage(questionContent.imageUrl);
      } else if (type === "check") {
        setAnswer2(questionContent.answer2);
      } else if (type === "blank") {
        setAnswer2(questionContent.answer2);
        setBlankType(+questionContent.blankType);
        setPartialQuestion1(questionContent.content2);
        if (+questionContent.blankType === 0) {
          setPartialQuestion2(questionContent.content3);
        }
      }
    } else {
      if (type === "check" || type === "blank") {
        setAnswer2("");
        setIsUpdate(false);
      }
    }
  }, [questionContent]);

  return (
    <form className="question">
      {type === "blank" && (
        <div className="question-black-struct">
          <div
            onClick={() => handleChooseBlankType(0)}
            className={
              blankType === 0
                ? "blank-option blank-option-active"
                : "blank-option"
            }
          >
            <img src={blankOption1} alt="option1" />
          </div>
          <div
            onClick={() => handleChooseBlankType(1)}
            className={
              blankType === 1
                ? "blank-option blank-option-active"
                : "blank-option"
            }
          >
            <img src={blankOption2} alt="option2" />
          </div>
          <div
            onClick={() => handleChooseBlankType(2)}
            className={
              blankType === 2
                ? "blank-option blank-option-active"
                : "blank-option"
            }
          >
            <img src={blankOption3} alt="option3" />
          </div>
        </div>
      )}
      <div>
        <label>Content {type === "blank" && "1"}:</label>
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
            <label>Content 2:</label>
            <input
              className={
                errors[8]
                  ? "question-input question-input-error"
                  : "question-input"
              }
              type="text"
              onChange={(e) => setPartialQuestion1(e.target.value)}
              value={partialQuestion1}
            />
            <span>{errors[8] && <Error error="Must fill attribure" />}</span>
          </div>
          {blankType === 0 && (
            <div>
              <label>Content 3:</label>
              <input
                className={
                  errors[9]
                    ? "question-input question-input-error"
                    : "question-input"
                }
                type="text"
                onChange={(e) => setPartialQuestion2(e.target.value)}
                value={partialQuestion2}
              />
              <span>{errors[9] && <Error error="Must fill attribure" />}</span>
            </div>
          )}
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
            defaultImg={defaultImage}
            isQuestion={true}
            blob={imageBlob}
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
