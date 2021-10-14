import React from "react";
import styled from "styled-components";

const Message = styled.section`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    margin-bottom: ${({ theme }) => theme.spacerMd};
  }
  p {
    display: block;
    font-size: ${({ theme }) => theme.fontMd};
    line-height: ${({ theme }) => theme.spacerMd};
  }
`;

const CentralMessage = ({ children }) => {
  return <Message>{children}</Message>;
};

export default CentralMessage;
