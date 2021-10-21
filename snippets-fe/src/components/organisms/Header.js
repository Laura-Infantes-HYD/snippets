import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../molecules/Navigation";
import { UserContext } from "../../providers/UserProvider";

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 3rem 0;
`;

const Logo = styled.div`
  font-size: 2.25rem;

  p {
    font-size: 1rem;
    margin-top: 1rem;
  }
`;

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <MainHeader className="App-header">
      <Logo>
        <Link to="/">My Snippets</Link>
        {user && <p>Hello {user.email}</p>}
      </Logo>
      <Navigation />
    </MainHeader>
  );
};

export default Header;
