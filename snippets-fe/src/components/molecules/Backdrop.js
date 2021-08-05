import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.primaryLightTransparent}};
  z-index: 1;

  > * {

  background: ${({ theme }) => theme.primaryDark}};
  }
`;

export default (props) => {
  return <Backdrop>{props.children}</Backdrop>;
};
