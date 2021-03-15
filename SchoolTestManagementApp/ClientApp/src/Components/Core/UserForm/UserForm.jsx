import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiQuestionLine } from "react-icons/ri";
import {
  length,
  required,
  emailValidate,
  passwordValidate,
} from "../../../utils/validators";

import "./UserForm.css";

import Button from "../../../Components/Core/Button/Button";
import Switcher from "../../../Components/Core/Switcher/Switcher";
import Spinner from "../../../Components/Core/Spinner/Spinner";
import Notification from "../../../Components/Core/Notification/Notification";
import InputImage from "../../../Components/Core/InputImage/InputImage";
import {
  signUp,
  getAllProfessions,
  getAllClassrooms,
  actionAuthSuccess,
  authFail,
  authResetNotify,
} from "../../../store/actions/index";

const UserForm = ({
  stateAuth = "",
  updateState = () => {},
  isLogin = false,
}) => {
  const [idCard, setIdCard] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [profession, setProfession] = useState(1);
  const [idClassroom, setIdClassroom] = useState(1);
  const [isStudent, setIsStudent] = useState(false);
  const [defaultImage, setDefaultImage] = useState("profileDefault.png");
  const [touched, setTouched] = useState(false);
  const [validateInputs, setValidateInputs] = useState([
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
  const [infoPass, setInfoPass] = useState(false);
  const professions = useSelector((state) => state.general.professions);
  const classrooms = useSelector((state) => state.general.classrooms);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const notify = useSelector((state) => state.auth.notify);
  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    updateState("signup");
    const isValid = validateForm();
    if (isValid) {
      dispatch(
        signUp(
          {
            idCard: idCard,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            phoneNumber: phoneNumber,
            passwordHash: password,
            confirmPassword: confirmPassword,
            city: city.toLowerCase(),
            address: address.toLowerCase(),
            idProfession: profession,
            idClassroom: idClassroom,
            image: imageFile,
            imageUrl: imageUrl,
            userType: isStudent ? "student" : "teacher",
          },
          isLogin
        )
      );
      setTouched(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const validators = [
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
    if (!length({ min: 9, max: 10 })(idCard) || !required(idCard)) {
      validators[0] = true;
      isValid = false;
    }
    if (!required(name)) {
      validators[1] = true;
      isValid = false;
    }
    if (!emailValidate(email) || !required(email)) {
      validators[2] = true;
      isValid = false;
    }
    if (!required(password) && !isLogin) {
      if (!passwordValidate(password)) {
        validators[3] = true;
        isValid = false;
      }
    }
    if (!required(password) && !isLogin) {
      if (password !== confirmPassword) {
        validators[4] = true;
        isValid = false;
      }
    }

    if (!length({ min: 10, max: 10 })(phoneNumber) || !required(phoneNumber)) {
      validators[5] = true;
      isValid = false;
    }
    if (!required(city)) {
      validators[6] = true;
      isValid = false;
    }
    if (!required(address)) {
      validators[7] = true;
      isValid = false;
    }
    if (imageUrl === "" && imageFile === null) {
      validators[8] = true;
      isValid = false;
    }

    setValidateInputs(validators);
    if (!isValid) {
      dispatch(authFail(["Error: Invalid user inputs"]));
      return false;
    }
    return true;
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      let fileName = Date.now() + "." + image.name.split(".")[1];
      const localImageUrl = URL.createObjectURL(image);
      setImageBlob(localImageUrl);
      setImageUrl(fileName);
      setImageFile(image);
      setTouched(true);
    } else {
      setImageUrl("");
      setImageFile("");
      setImageBlob("");
    }
  };

  useEffect(() => {
    let timer;
    if (error && stateAuth !== "login") {
      let validators = [...validateInputs];
      error.forEach((e) => {
        if (e === "all") {
          validators = [true, true, true, true, true, true, true, true];
        }
        if (e === "email") {
          validators[2] = true;
        }
        if (e === "password") {
          validators[3] = true;
        }
        if (e === "idCard") {
          validators[0] = true;
        }
        if (e === "phoneNumber") {
          validators[5] = true;
        }
      });
      setValidateInputs(validators);
      timer = setTimeout(() => {
        dispatch(actionAuthSuccess());
      }, 10000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error, actionAuthSuccess]);

  useEffect(() => {
    if (!isLogin) {
      dispatch(getAllProfessions());
      dispatch(getAllClassrooms());
    }
  }, [getAllProfessions, getAllClassrooms, isLogin]);

  useEffect(() => {
    if (isLogin) {
      setIdCard(userProfile.idCard);
      setName(userProfile.name);
      setEmail(userProfile.email);
      setPhoneNumber(userProfile.phoneNumber);
      setCity(userProfile.city);
      setAddress(userProfile.address);
      setImageUrl(userProfile.imageUrl);
      setDefaultImage(userProfile.imageUrl);
    }
  }, []);

  return (
    <div className={!isLogin ? "signup-content" : null}>
      <Notification
        message="User details updated successfully"
        error={notify}
        resetError={() => dispatch(authResetNotify())}
      />
      {!isLogin && (
        <div className="signup-title">
          <h5>Sign up now</h5>
          <p>Fill in the form below to get instant access: </p>
        </div>
      )}
      <div>
        {!isLogin && (
          <div className="signup-user-type-title">
            <h5>{isStudent ? "STUDENT" : "TEACHER"}</h5>
          </div>
        )}
        <InputImage
          blob={imageBlob}
          click={showPreview}
          isEmpty={validateInputs[8]}
          defaultImg={defaultImage}
        />
        <div>
          {!isLogin && (
            <div className="signup-tuggle">
              <Switcher clicked={setIsStudent} position={isStudent} />
            </div>
          )}
          <form className="signup-form" onSubmit={handleSubmitForm}>
            <div className="signup-error">
              {error &&
                stateAuth !== "login" &&
                error.map((e, i) => {
                  if (e === "email") return <p key={i}>Email already in use</p>;
                  if (e === "idCard")
                    return <p key={i}>Id card already in use</p>;
                  return <p key={i}>{e}</p>;
                })}
            </div>
            <input
              className={
                validateInputs[0]
                  ? "signup-form-input signup-form-input-error"
                  : "signup-form-input"
              }
              placeholder="Id Card.."
              type="number"
              name="idCard"
              value={idCard}
              onClick={() => setTouched(true)}
              onChange={(e) => setIdCard(e.target.value)}
            />
            <input
              className={
                validateInputs[1]
                  ? "signup-form-input signup-form-input-error"
                  : "signup-form-input"
              }
              placeholder="Name.."
              type="text"
              name="name"
              value={name}
              onClick={() => setTouched(true)}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={
                validateInputs[2]
                  ? "signup-form-input signup-form-input-error"
                  : "signup-form-input"
              }
              placeholder="E-Mail.."
              type="email"
              name="email"
              value={email}
              onClick={() => setTouched(true)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-input-password">
              <input
                className={
                  validateInputs[3]
                    ? "signup-form-input signup-form-input-error"
                    : "signup-form-input"
                }
                placeholder="Password.."
                type="password"
                name="password"
                value={password}
                onClick={() => setTouched(true)}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="popUp-password-validate-icon"
                onMouseOut={() => setInfoPass(false)}
                onMouseOver={() => setInfoPass(true)}
              >
                <RiQuestionLine />
              </div>
              {infoPass && (
                <div className="popUp-password-validate">
                  <p>
                    Password between 6 to 15 characters which contain at least
                    one numeric digit, one uppercase and one lowercase letter
                  </p>
                </div>
              )}
            </div>
            <input
              className={
                validateInputs[4]
                  ? "signup-form-input signup-form-input-error"
                  : "signup-form-input"
              }
              placeholder="Confirm Password.."
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onClick={() => setTouched(true)}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={
                validateInputs[5]
                  ? "signup-form-input signup-form-input-error"
                  : "signup-form-input"
              }
              placeholder="Phone Number.."
              type="text"
              name="phoneNummber"
              value={phoneNumber}
              onClick={() => setTouched(true)}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className={
                validateInputs[6]
                  ? "signup-form-input signup-form-input-error"
                  : "signup-form-input"
              }
              placeholder="City.."
              type="text"
              name="city"
              value={city}
              onClick={() => setTouched(true)}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className={
                validateInputs[7]
                  ? "signup-form-input signup-form-input-error"
                  : "signup-form-input"
              }
              placeholder="Address.."
              type="text"
              name="address"
              value={address}
              onClick={() => setTouched(true)}
              onChange={(e) => setAddress(e.target.value)}
            />
            {!isLogin && !isStudent ? (
              <>
                <select
                  className="signup-form-select"
                  placeholder="Profession.."
                  onChange={(e) => setProfession(e.target.value)}
                  value={profession}
                >
                  {professions.map((p) => {
                    return (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : !isLogin ? (
              <>
                <select
                  className="signup-form-select"
                  placeholder="Classroom.."
                  onChange={(e) => setIdClassroom(e.target.value)}
                  value={idClassroom}
                >
                  {classrooms.map((p) => {
                    return (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : null}
            <div
              className={
                isLogin && !touched
                  ? "signup-submit-btn-auth signup-submit-btn-auth-disabled"
                  : isLogin
                  ? "signup-submit-btn-auth"
                  : "signup-submit-btn"
              }
            >
              <Button disabled={!touched}>
                {loading && stateAuth !== "login" ? (
                  <Spinner />
                ) : isLogin ? (
                  "UPDATE"
                ) : (
                  "SIGN ME UP!"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
