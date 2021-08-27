import React from "react";
import { BrowserRouter as NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  .active {
    color: white;
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <ul>
        <li>
          <NavLink to="/favourites">Favourites</NavLink>
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;
