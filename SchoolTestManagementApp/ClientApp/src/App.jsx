import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import TeacherDashboard from "./Pages/Teacher/Dashboard";
import StudentDashboard from "./Pages/Student/Dashboard";
import Layout from "./hoc/Layout/Layout";
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
              <Route path="/" component={Auth} />
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
