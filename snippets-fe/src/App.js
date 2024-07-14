import "./App.scss";

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import ConfirmAccount from "./components/templates/ConfirmAccount";
import Favourites from "./components/templates/Favourites";
import Header from "./components/organisms/Header";
import Home from "./components/templates/Home";
import Login from "./components/templates/Login";
import MessageScreen from "./components/templates/MessageScreen";
import React from "react";
import Signup from "./components/templates/Signup";
import SignupValidationProvider from "./providers/SignupValidationProvider";
import { ThemeProvider } from "styled-components";
import UserProvider from "./providers/UserProvider";
import theme from "./style/theme";

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/favourites">
              <Header />
              <Favourites />
            </Route>
            <Route path="/snippets">
              <Header />
              <Home />
            </Route>
            <Route path="/sign-up">
              <SignupValidationProvider>
                <Signup />
              </SignupValidationProvider>
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/confirm/:token" component={ConfirmAccount} />
            <Route path="/message/:type" component={MessageScreen} />
            <Route exact path="/">
              <Header />
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
