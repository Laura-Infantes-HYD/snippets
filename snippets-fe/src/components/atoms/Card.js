import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 2rem;
  border-radius: 1rem;
`;

export default ({ children }) => {
  return <Card>{children}</Card>;
};
