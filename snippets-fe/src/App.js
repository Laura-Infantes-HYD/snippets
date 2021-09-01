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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path="/favourites">
            <Favourites />
          </Route>
          <Route path="/snippets">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/snippets" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
