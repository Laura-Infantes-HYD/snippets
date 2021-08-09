import React from "react";
import styled from "styled-components";

const RoundedCard = styled.div`
  padding: 2rem;
  border-radius: 1rem;
`;

const Card = ({ children }) => {
  return <RoundedCard>{children}</RoundedCard>;
};

export default Card;
