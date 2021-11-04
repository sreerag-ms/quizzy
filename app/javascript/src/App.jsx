import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Login from "./components/Authentication";
import { getFromLocalStorage } from "./helpers/localStorage";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);
  if (loading) return <div>loading...</div>;

  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
        <Route
          exact
          path="/"
          render={() => {
            return <div>{getFromLocalStorage("userName")} Logged in</div>;
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
