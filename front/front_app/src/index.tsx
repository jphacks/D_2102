import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter } from "react-router-dom";

import Auth from "./features/auth/Auth";
import Home from "./features/home/Home";
import Room from "./features/room/Room";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0679EB",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div>
          <Route exact path="/login" component={Auth} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/room/:subjectsId" component={Room} />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
