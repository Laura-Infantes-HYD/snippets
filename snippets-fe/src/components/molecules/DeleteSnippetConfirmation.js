import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import { PositionToRight } from "../atoms/PositionToRight";
import Modal from "../organisms/Modal";

const PaddedP = styled.p`
  padding: 2rem 0;
`;

const DeleteSnippetConfirmation = ({ deleteSnippet, deleting }) => {
  return (
    <Modal closeModal={() => deleting(false)}>
      <PaddedP>Permanently remove snippet?</PaddedP>
      <PositionToRight>
        <Button btnType="danger" onClick={deleteSnippet} text="Remove" />
      </PositionToRight>
    </Modal>
  );
};

export default DeleteSnippetConfirmation;
