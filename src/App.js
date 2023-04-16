import { ThemeProvider } from "styled-components";
import React, { Component } from "react";

import { Provider } from "mobx-react";
import { observer } from "mobx-react";
import AppStore from "./store";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
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
import Preview from "./Preview";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminUsers from "./Admin/AdminUsers";
import AdminHistory from "./Admin/AdminHistory";
import AdminUser from "./Admin/AdminUser";
import AdminServices from "./Admin/AdminServices";

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
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#079196",
  headerFontColor: "#FFFFFF",
  headerFontSize: "18px",
  botBubbleColor: "#EBFAF8",
  botFontColor: "#475467",
  userBubbleColor: "#05BBC2",
  userFontColor: "#FFFFFF",
};

const materialtheme = createTheme({
  palette: {
    primary: {
      main: "#079196", // #cb1313
    },
  },
  typography: {
    button: {
      textTransform: "none",
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
                        <PrivateRoute
                          isAdmin={window.store.profile.accountType === "admin"}
                          path="/admin/dashboard"
                        >
                          <AdminDashboard />
                        </PrivateRoute>
                        <PrivateRoute
                          isAdmin={window.store.profile.accountType === "admin"}
                          path="/admin/user/:id"
                        >
                          <AdminUser />
                        </PrivateRoute>
                        <PrivateRoute
                          isAdmin={window.store.profile.accountType === "admin"}
                          path="/admin/users"
                        >
                          <AdminUsers />
                        </PrivateRoute>
                        <PrivateRoute
                          isAdmin={window.store.profile.accountType === "admin"}
                          path="/admin/history"
                        >
                          <AdminHistory />
                        </PrivateRoute>

                        <PrivateRoute
                          isAdmin={window.store.profile.accountType === "admin"}
                          path="/admin/services"
                        >
                          <AdminServices />
                        </PrivateRoute>

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
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/">
                          <Redirect to="/dashboard" />
                        </Route>
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
                    <Route
                      path="/travel"
                      render={(props) => {
                        return <Preview {...props} />;
                      }}
                    />
                    <Route
                      path="/workout"
                      render={(props) => {
                        return <Preview {...props} />;
                      }}
                    />
                    {/* <Route path="/" exact>
                      <Redirect to="/login" />
                    </Route> */}
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

function PrivateRoute({ isAdmin, children, ...rest }) {
  console.log("isAdmin", isAdmin);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
