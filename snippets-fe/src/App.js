import "./App.scss";
import Home from "./components/templates/Home";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./components/organisms/Header";
import Favourites from "./components/templates/Favourites";
import Signup from "./components/templates/Signup";
import MessageScreen from "./components/templates/MessageScreen";
import ConfirmAccount from "./components/templates/ConfirmAccount";
import SignupValidationProvider from "./providers/SignupValidationProvider";
import UserProvider from "./providers/UserProvider";
import Login from "./components/templates/Login";
import { Provider as StateProvider } from "react-redux";
import rootStore from "./app/root.store";
import ProtectedRoute from "./components/templates/ProtectedRoute";

function App() {
  return (
    <StateProvider store={rootStore}>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/favourites">
                <Header />
                <Favourites />
              </Route>
              <ProtectedRoute path="/snippets">
                <Home />
              </ProtectedRoute>
              <Route path="/sign-up">
                <SignupValidationProvider>
                  <Signup />
                </SignupValidationProvider>
              </Route>
              <Route path="/login" component={Login} />
              <Route path="/confirm/:token" component={ConfirmAccount} />
              <Route path="/message/:type" component={MessageScreen} />
              <ProtectedRoute path="/">
                <Header />
                <Redirect to="/snippets" />
              </ProtectedRoute>
            </Switch>
          </Router>
        </ThemeProvider>
      </UserProvider>
    </StateProvider>
  );
}

export default App;
