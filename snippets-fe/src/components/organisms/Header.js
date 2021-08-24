import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  padding: 3rem 0 0;
  font-size: 2.25rem;
`;

const Header = () => {
  return (
    <header className="App-header">
      <Logo>My Snippets</Logo>
    </header>
  );
};

export default Header;
