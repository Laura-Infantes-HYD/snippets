import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../molecules/Navigation";

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 3rem 0;
`;

const Logo = styled.div`
  font-size: 2.25rem;
`;

const Header = () => {
  return (
    <MainHeader className="App-header">
      <Logo>
        <Link to="/">My Snippets</Link>
      </Logo>
      <Navigation />
    </MainHeader>
  );
};

export default Header;
