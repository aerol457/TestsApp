import React, { useContext, useEffect } from "react";
import { GoLocation } from "react-icons/go";
import { MdPermIdentity } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { RiLogoutBoxLine, RiUserSettingsLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import Spinner from "../Core/Spinner/Spinner";
import { getUserProfile, authLogout } from "../../store/actions/index";
import { DashboardContext } from "../../context/DashboardContext";

const Profile = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const loading = useSelector((state) => state.general.loading);
  const dashboardContext = useContext(DashboardContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userProfile) return dispatch(getUserProfile());
  }, [getUserProfile]);

  return (
    <>
      <span
        className="user-settings-icon"
        onClick={dashboardContext.viewUserSettings}
      >
        <RiUserSettingsLine />
      </span>
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
            : null}
        </h4>
      </div>
      {userProfile.userType !== "admin" && (
        <div className="dashboard-content-end">
          <p className="profile-user-details">
            <span>
              <MdPermIdentity />
            </span>
            {userProfile.idCard}
          </p>
          <p className="profile-user-details">
            <span>
              <GoLocation />
            </span>
            {userProfile.city}, {userProfile.address}
          </p>
          <p className="profile-user-details">
            <span>
              <AiOutlinePhone />
            </span>
            {userProfile.phoneNumber}
          </p>
        </div>
      )}
      <div className="profile-logout">
        <RiLogoutBoxLine
          className="profile-logout-icon"
          onClick={() => dispatch(authLogout())}
        />
      </div>
    </>
  );
};

export default Profile;
