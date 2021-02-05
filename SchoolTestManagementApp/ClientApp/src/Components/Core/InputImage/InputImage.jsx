import React from "react";

import "./InputImage.css";

const InputImage = ({
  blob,
  defaultImg,
  click,
  isQuestion = false,
  isEmpty = false,
}) => {
  return (
    <div className="input-image">
      <div className="img-container">
        <label
          className={isQuestion ? "img-label background-white" : "img-label"}
        >
          <input
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={click}
          />
          <img
            className={
              isEmpty ? " input-image input-image-error" : "input-image"
            }
            src={blob === "" ? `/Images/${defaultImg}` : blob}
            alt="img question"
          />
        </label>
      </div>
    </div>
  );
};

export default InputImage;
