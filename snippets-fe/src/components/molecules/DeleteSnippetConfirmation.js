import React from "react";
import styled from "styled-components";
import DangerBtn from "../atoms/DangerBtn";
import { PositionToRight } from "../atoms/PositionToRight";

const PaddedP = styled.p`
  padding: 1rem 0;
`;

const DeleteSnippetConfirmation = ({ deleteSnippet }) => {
  return (
    <div>
      <PaddedP>Permanently remove snippet?</PaddedP>
      <PositionToRight>
        <DangerBtn onClick={deleteSnippet} text="Remove" />
      </PositionToRight>
    </div>
  );
};

export default DeleteSnippetConfirmation;
