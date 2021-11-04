import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { initializeLogger } from "common/logger";

import Login from "./components/Authentication";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    setLoading(false);
  }, []);
  if (loading) return <div>loading...</div>;

  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
    </Router>
  );
};

export default App;
