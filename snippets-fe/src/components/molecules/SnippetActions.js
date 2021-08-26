import React, { useState } from "react";
import {
  useRemoveSnippetMutation,
  useUpdateSnippetMutation,
} from "../../services/snippets";
import DeleteSnippetConfirmation from "./DeleteSnippetConfirmation";
import Button from "../atoms/Button";
import Heart from "../atoms/Heart";
import AddSnippet from "./AddSnippet";
import styled from "styled-components";

const SnippetActionsWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  button {
    margin-left: ${({ theme }) => theme.spacerXs};
  }
`;

const SnippetActions = ({ snippet, favouritePage }) => {
  console.log("snippet: ", snippet);
  const { id, isFavourite } = snippet;
  const [removeSnippet] = useRemoveSnippetMutation();
  const [updateSnippet] = useUpdateSnippetMutation();
  const [showDeletingModal, setShowDeletingModal] = useState(false);
  const [showEditingModal, setShowEditingModal] = useState(false);
  const deleteSnippet = () => {
    removeSnippet(id).then(() => setShowDeletingModal(false));
  };

  return (
    <>
      <SnippetActionsWrap>
        <Button
          btnType="danger"
          onClick={() => setShowDeletingModal(true)}
          text="Remove"
        />
        <Button
          btnType="ctaSecondary"
          onClick={() => {
            setShowEditingModal(true);
          }}
          text="Edit"
        />

        {!favouritePage && (
          <Button
            btnType={isFavourite ? "ctaTertiary" : "ctaInactive"}
            onClick={() => {
              updateSnippet({ id, isFavourite: !isFavourite });
            }}
            text=""
            label="Add to favourites"
          >
            <Heart />
          </Button>
        )}
      </SnippetActionsWrap>

      {/* MODALS */}
      {showDeletingModal && (
        <DeleteSnippetConfirmation
          deleting={setShowDeletingModal}
          deleteSnippet={deleteSnippet}
        />
      )}
      {showEditingModal && <AddSnippet show={setShowEditingModal} />}
    </>
  );
};

export default SnippetActions;
