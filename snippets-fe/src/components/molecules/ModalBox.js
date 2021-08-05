import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import { PositionToRight } from "../atoms/PositionToRight";

const CloseButton = styled(Button)`
  &:after {
    content: "X";
    font-size: 1rem;
    color: ${({ theme }) => theme.primaryLight};
  }
  padding: 0;
  background: transparent;
`;

const ModalBox = (props) => {
  return (
    <Card>
      <PositionToRight>
        <CloseButton aria-label="close" onClick={props.closeModal} />
      </PositionToRight>
      {props.children}
    </Card>
  );
};

export default ModalBox;
