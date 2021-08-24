import React from "react";
import styled from "styled-components";

const Backdrop = (props) => {
  return <BackdropWhite>{props.children}</BackdropWhite>;
};

const BackdropWhite = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.primaryLightTransparent}};
  z-index: 1;

  > * {

  background: ${({ theme }) => theme.primaryDark}};
  }
`;

export default Backdrop;
