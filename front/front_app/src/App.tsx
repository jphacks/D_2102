import React from "react";
import Default from "./Default";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Default} />
    </Switch>
  );
}

export default App;
