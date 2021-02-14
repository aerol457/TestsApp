import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import Auth from "./Pages/Auth/Auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { authCheckState } from "./store/actions/index";

function App() {
  const isAuth = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [authCheckState]);

  return <div className="my-app">{isAuth ? <Dashboard /> : <Auth />}</div>;
}

export default App;
