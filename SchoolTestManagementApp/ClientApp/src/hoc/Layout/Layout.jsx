import React, { useState } from "react";

import "./Layout.css";
import NavMenu from "../../Components/NavMenu/NavMenu";

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  const onToggleNav = () => {
    setShowNav((prevState) => !prevState);
  };

  return (
    <div className="layout-full-content">
      <NavMenu show={showNav} clicked={onToggleNav} />
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
