import React from "react";
import styled from "styled-components";

const Tag = ({ text }) => {
  return <Lozenge>{text}</Lozenge>;
};

const Lozenge = styled.li`
  display: inline-block;
  padding: .3rem .6rem;
  margin-right: ${({ theme }) => theme.spacerXs}};
  background:  ${({ theme }) => theme.primaryLight}};
  color: ${({ theme }) => theme.secondaryDark}};
  letter-spacing: 1.5px;
  border: none;
  border-radius: 1rem;
`;

export default Tag;
