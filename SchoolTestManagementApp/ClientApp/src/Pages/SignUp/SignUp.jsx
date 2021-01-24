import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SignUp.css";

import Backdrop from "../../Components/Core/Backdrop/Backdrop";
import Modal from "../../Components/Core/Modal/Modal";
import Button from "../../Components/Core/Button/Button";
import Switcher from "../../Components/Core/Switcher/Switcher";
import {
  signUp,
  getAllProfessions,
  getAllClassrooms,
} from "../../store/actions/index";

const SignUp = () => {
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
  const [profession, setProfession] = useState(1);
  const [idClassroom, setIdClassroom] = useState(1);
  const [isStudent, setIsStudent] = useState(false);
  const professions = useSelector((state) => state.general.professions);
  const classrooms = useSelector((state) => state.general.classrooms);

  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      signUp({
        idCard: idCard,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        passwordHash: password,
        confirmPassword: confirmPassword,
        city: city,
        address: address,
        idProfession: profession,
        idClassroom: idClassroom,
        image: imageFile,
        imageUrl: imageUrl,
        userType: isStudent ? "student" : "teacher",
      })
    );
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      let fileName = Date.now() + "." + image.name.split(".")[1];
      // const localImageUrl = URL.createObjectURL(image);
      // setImageBlob(localImageUrl);
      setImageUrl(fileName);
      setImageFile(image);
    } else {
      setImageUrl("");
      setImageFile("");
      // setImageBlob("");
    }
  };

  useEffect(() => {
    dispatch(getAllProfessions());
    dispatch(getAllClassrooms());
  }, [getAllProfessions, getAllClassrooms]);

  return (
    <div className="content">
      <div className="content-body">
        <Backdrop show />
        <div className="content-modal">
          <Modal>
            <Switcher clicked={setIsStudent} position={isStudent} />
            <form
              className="modal-content-args"
              onSubmit={(e) => handleSubmitForm(e)}
            >
              <div className="modal-content-argument">
                <label>Id Card:</label>
                <input
                  type="text"
                  name="idCard"
                  maxLength={10}
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                />
              </div>
              <div className="modal-content-argument">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="modal-content-argument">
                <label>E-Mail:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="modal-content-argument">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNummber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="modal-content-argument">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="modal-content-argument">
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="modal-content-argument">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="modal-content-argument">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="modal-content-argument">
                {!isStudent ? (
                  <>
                    <label>Profession:</label>
                    <select
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
                ) : (
                  <>
                    <label>Classroom:</label>
                    <select
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
                )}
              </div>
              <div className="modal-content-argument">
                <label>Photo Profile:</label>
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/*"
                  onChange={(e) => showPreview(e)}
                />
              </div>
              <div className="modal-content-btn">
                <Button>SUBMIT</Button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
