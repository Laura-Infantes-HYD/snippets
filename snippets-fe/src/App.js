import "./App.scss";
import Home from "./components/templates/Home";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
