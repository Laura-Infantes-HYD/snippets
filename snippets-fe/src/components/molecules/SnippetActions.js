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
import Loader from "../atoms/Loader";

const SnippetActionsWrap = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  button {
    margin-left: ${({ theme }) => theme.spacerXs};
  }

  .loading {
    padding: 0.25rem 0.63rem;
  }
`;

const SnippetActions = ({ snippet, favouritePage }) => {
  const { _id, isFavourite } = snippet;
  const [removeSnippet] = useRemoveSnippetMutation();
  const [updateSnippet, { isLoading: isUpdating }] = useUpdateSnippetMutation();
  const [showDeletingModal, setShowDeletingModal] = useState(false);
  const [showEditingModal, setShowEditingModal] = useState(false);
  const deleteSnippet = () => {
    removeSnippet(_id).then(() => setShowDeletingModal(false));
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
              updateSnippet({ _id, isFavourite: !isFavourite });
            }}
            text=""
            label="Add to favourites"
            className={isUpdating ? "loading" : ""}
          >
            {isUpdating && <Loader />}
            {!isUpdating && <Heart />}
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
      {showEditingModal && (
        <AddSnippet
          show={setShowEditingModal}
          snippet={snippet}
          action="update"
        />
      )}
    </>
  );
};

export default SnippetActions;
