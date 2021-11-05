import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication";
import PrivateRoute from "components/Common/PrivateRoute";
import Home from "components/Home";
import { getFromLocalStorage } from "helpers/localStorage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = authToken && authToken.length > 0;
  logger.log("info", !!authToken);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);
  if (loading) return <PageLoader />;

  return (
    <Router>
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
