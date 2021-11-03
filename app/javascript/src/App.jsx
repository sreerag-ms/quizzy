import React, { useEffect } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { initializeLogger } from "common/logger";

const App = () => {
  useEffect(() => {
    initializeLogger();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Hello quizzy</div>} />
      </Switch>
    </Router>
  );
};

export default App;
