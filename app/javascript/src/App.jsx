import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication";
import PrivateRoute from "components/Common/PrivateRoute";
import Home from "components/Home";
import NotFound from "components/NotFound";
import AttendQuiz from "components/public/AttendQuiz";
import ShowResults from "components/public/ShowResults";
import VerifySlug from "components/public/VerifySlug";
import Reports from "components/Reports";
import ShowQuiz from "components/ShowQuiz";
import { getFromLocalStorage } from "helpers/localStorage";

import { UserContext } from "./common/userContext";

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
  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

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
          <Route exact path="/public/quiz/:slug" component={VerifySlug} />
          <Route
            exact
            path="/public/quiz/:slug/attempts/new"
            component={AttendQuiz}
          />
          <Route
            exact
            path="/public/quiz/:slug/result"
            component={ShowResults}
          />
          <PrivateRoute
            exact
            path="/quiz/:id"
            redirectRoute="/login"
            condition={isAuthenticated}
            component={ShowQuiz}
          />
          <PrivateRoute
            exact
            path="/reports"
            redirectRoute="/login"
            condition={isAuthenticated}
            component={Reports}
          />
          <PrivateRoute
            exact
            path="/"
            redirectRoute="/login"
            condition={isAuthenticated}
            component={Home}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
