import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication";
import PrivateRoute from "components/Common/PrivateRoute";
import Home from "components/Home";
import ShowQuiz from "components/ShowQuiz";
import { getFromLocalStorage } from "helpers/localStorage";

import { UserContext } from "./common/userContext";
import AttendQuiz from "./components/public/AttendQuiz";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = authToken && authToken.length > 0;

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const initUser = () => {
    const userName = getFromLocalStorage("userName");
    setCurrentUser({ userName });
  };
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    initUser();
  }, []);
  if (loading) return <PageLoader />;

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UserContext.Provider value={{ currentUser }}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            path="/my_quiz/:id"
            redirectRoute="/login"
            condition={isAuthenticated}
            component={ShowQuiz}
          />
          <PrivateRoute
            path="/public/quiz/:slug"
            // TODO: To be changed to public register page
            redirectRoute="/login"
            condition={isAuthenticated}
            component={AttendQuiz}
          />
          <PrivateRoute
            path="/"
            redirectRoute="/login"
            condition={isAuthenticated}
            component={Home}
          />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
