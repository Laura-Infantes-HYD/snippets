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

function App() {
  return (
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
            <Signup />
          </Route>
          <Route path="/confirm/:token" component={ConfirmAccount} />
          <Route path="/message/:type" component={MessageScreen} />
          <Route exact path="/">
            <Header />
            <Redirect to="/snippets" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
