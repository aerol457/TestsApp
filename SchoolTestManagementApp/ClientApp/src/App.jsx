import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import TeacherDashboard from "./Pages/Teacher/Dashboard";
import StudentDashboard from "./Pages/Student/Dashboard";
import Layout from "./Components/Core/Layout/Layout";
import { authCheckState } from "./store/actions/index";

function App() {
  const isAuth = useSelector((state) => state.auth.token !== null);
  const userDetails = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [authCheckState]);

  return (
    <>
      <Layout>
        <Switch>
          {!isAuth && (
            <>
              <Route path="/login" component={Login} />
              <Route path="/sign-up" component={SignUp} />
            </>
          )}
          {userDetails.userType === "teacher" ? (
            <Route path="/" component={TeacherDashboard} />
          ) : userDetails.userType === "student" ? (
            <Route path="/" component={StudentDashboard} />
          ) : null}
        </Switch>
      </Layout>
    </>
  );
}

export default App;
