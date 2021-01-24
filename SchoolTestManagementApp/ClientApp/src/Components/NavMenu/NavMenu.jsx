import React from "react";
import { FaAlignRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import NavItem from "./NavItem/NavItem";
import { authLogout } from "../../store/actions/index";

import "./NavMenu.css";

const NavMenu = ({ show, clicked }) => {
  const isAuth = useSelector((state) => state.auth.token === null);

  const dispatch = useDispatch();

  return (
    <div className="nav">
      <div className="nav-layout">
        <div className="nav-header">
          <NavItem link="/" title="Logo" />
          <div className="nav-toggle">
            <FaAlignRight onClick={clicked} />
          </div>
        </div>
        <div className={show ? "nav-items show-nav" : "nav-items"}>
          <div className="nav-items-left">
            <NavItem link="/" title="Home" clicked={clicked} />
          </div>
          <div className="nav-items-right">
            {isAuth ? (
              <>
                <NavItem link="/login" title="Login" clicked={clicked} />
                <NavItem link="/sign-up" title="Sign Up" clicked={clicked} />
              </>
            ) : (
              <NavItem
                link="/login"
                title="Logout"
                clicked={() => dispatch(authLogout())}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
