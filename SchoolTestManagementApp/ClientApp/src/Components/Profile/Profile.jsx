import React, { useEffect } from "react";
import { GoLocation } from "react-icons/go";
import { MdPermIdentity } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import Spinner from "../Core/Spinner/Spinner";
import { getUserProfile } from "../../store/actions/index";

const Profile = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const loading = useSelector((state) => state.general.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userProfile) return dispatch(getUserProfile());
  }, [getUserProfile]);

  return (
    <>
      <div className="dashboard-content-header">
        {loading ? (
          <Spinner />
        ) : (
          <img
            src={`/Images/${
              userProfile.imageUrl !== "" ? userProfile.imageUrl : "default.jpg"
            }`}
            alt="profile"
          />
        )}
        <h1>{userProfile.name}</h1>
        <h4>
          {userProfile.userType === "teacher"
            ? userProfile.idProfessionNavigation.name
            : userProfile.userType === "student"
            ? userProfile.idClassroomNavigation.name
            : "Admin"}
        </h4>
      </div>
      <div className="dashboard-content-end">
        <h5>
          <span>
            <MdPermIdentity />
          </span>
          {userProfile.idCard}
        </h5>
        <h5>
          <span>
            <GoLocation />
          </span>
          {userProfile.city}, {userProfile.address}
        </h5>
        <h5>
          <span>
            <AiOutlinePhone />
          </span>
          {userProfile.phoneNumber}
        </h5>
      </div>
    </>
  );
};

export default Profile;
