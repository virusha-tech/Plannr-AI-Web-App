import { ThemeProvider } from "styled-components";
import React, { Component } from "react";

import { Provider } from "mobx-react";
import { observer } from "mobx-react";
import AppStore from "./store";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// import colors from 'tailwindcss/colors'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import Header from "./Header";

import Header2 from "./Header2";
import Header3 from "./Header3";

import Search from "./Search";
import Pricing from "./Pricing"; // <--- Add this line

import Dashboard from "./Dashboard";

import Tool from "./Core/Tool";
import Chat from "./Core/Chat";

// import Login from './Login/Login'

import Profile from "./Profile";
import LoginSuccess from "./Login/Success";
import { NotificationContainer } from "react-notifications";

import "./App.scss";
import Auth from "./Auth/index";
import SavedPlans from "./SavedPlans";
import IntercomChat from "./IntercomChat";

if (!window.store) {
  window.store = new AppStore();
}

// Define what main theme will look like
const theme = {
  primary: "#079196", // #cb1313
  primary_gradient: "linear-gradient(0deg, #04adb4, #04adb4)",
  secondary_gradient: "linear-gradient(0deg, #05bbc2, #05bbc2)",
  gray: "#475467",
  personal: "#2CB082",
  professional: "#D99F21",
  business: "#336EE9",
  programming: "red",
};

const materialtheme = createTheme({
  palette: {
    primary: {
      main: "#079196", // #cb1313
    },
  },
});

@observer
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={materialtheme}>
          <Provider store={window.store}>
            <Router>
              {window.store.redirect ? (
                <Redirect to={window.store.redirect} />
              ) : null}
              {window.store.isLoggedIn ? (
                <>
                  {window.store.profile.status ? (
                    <>
                      {/* <Switch>
                        <Route path="/writing/document">
                          <div />
                        </Route>
                        <Route component={Header3} />
                      </Switch> */}
                      <Switch>
                        <Route
                          path="/saved-plans"
                          exact
                          component={SavedPlans}
                        />
                        <Route path="/search" exact component={Search} />

                        <Route path="/ai/">
                          <Switch>
                            <Route path="/ai/code/debugging" component={Chat} />
                            <Route
                              path="/ai/:toolname"
                              render={(props) => {
                                return (
                                  <Tool
                                    key={props.match.params.toolname}
                                    {...props}
                                  />
                                );
                              }}
                            />
                          </Switch>
                        </Route>
                        <Route path="/my-profile" component={Profile} />
                        <Route path="/signup/failed" component={Profile} />
                        <Route
                          path="/signup/success"
                          component={LoginSuccess}
                        />
                        <Route
                          path="/signup/success"
                          component={LoginSuccess}
                        />
                        <Route path="/" component={Dashboard} />
                      </Switch>
                      <IntercomChat />
                    </>
                  ) : (
                    <>
                      {/* Logged in but no plan */}
                      <Switch>
                        <Route
                          path="/signup/success"
                          component={LoginSuccess}
                        />
                        <Route>
                          <Pricing />
                        </Route>
                      </Switch>
                    </>
                  )}{" "}
                </>
              ) : (
                <>
                  <Switch>
                    <Route path="/" exact>
                      <Redirect to="/login" />
                    </Route>
                    <Route path="/" component={Auth} />
                  </Switch>
                </>
              )}
            </Router>
          </Provider>
          <NotificationContainer />
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
