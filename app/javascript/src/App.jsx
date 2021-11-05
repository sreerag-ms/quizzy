import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication";
import PrivateRoute from "components/Common/PrivateRoute";
import Home from "components/Home";
import { getFromLocalStorage } from "helpers/localStorage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = authToken && authToken.length > 0;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
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

      <Switch>
        <Route exact path="/login" render={() => <Login />} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isAuthenticated}
          component={() => <Home />}
        />
      </Switch>
    </Router>
  );
};

export default App;
