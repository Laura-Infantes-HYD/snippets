import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useRemoveSnippetMutation,
  useUpdateSnippetMutation,
} from "../../services/snippets";
import Tag from "../atoms/Tag";
import DeleteSnippetConfirmation from "./DeleteSnippetConfirmation";
import Button from "../atoms/Button";
import Heart from "../atoms/Heart";

const SnippetListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacerLg};
  margin-top: ${({ theme }) => theme.spacerLg};
  position: relative;
  h3,
  p {
    display: inline-block;
  }
  h3 {
    margin-right: ${({ theme }) => theme.spacerXs};
  }
  p {
    font-style: italic;
  }
  pre {
    margin-bottom: ${({ theme }) => theme.spacerSm};
  }
  ul {
    margin-top: ${({ theme }) => theme.spacerXs};
    margin-bottom: ${({ theme }) => theme.spacerSm};
  }
`;

const SnippetActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  button {
    margin-left: ${({ theme }) => theme.spacerXs};
  }
`;

const Snippet = ({
  snippet: { id, name, snippet, tags, language, isFavourite = false },
}) => {
  const [removeSnippet] = useRemoveSnippetMutation();
  const [updateSnippet, { isLoading: isUpdating }] = useUpdateSnippetMutation();
  const [code, setCode] = useState("");
  const [deletingConfirmation, setDeletingConfirmation] = useState(false);

  const deleteSnippet = () => {
    removeSnippet(id).then(() => setDeletingConfirmation(false));
  };

  useEffect(() => {
    const hljs = require("highlight.js");
    setCode(hljs.highlight(snippet, { language }).value);
  });

  return (
    <SnippetListItem>
      <h3>{name}</h3>
      <p>{language}</p>

      <ul>
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </ul>

      <pre
        className="hljs"
        id={`snippet${id}`}
        dangerouslySetInnerHTML={{
          __html: code,
        }}
      />

      <SnippetActions>
        <Button
          btnType="danger"
          onClick={() => setDeletingConfirmation(true)}
          text="Remove"
        />
        <Button
          btnType="ctaSecondary"
          //onClick={}
          text="Edit"
        />

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
      </SnippetActions>

      {deletingConfirmation && (
        <DeleteSnippetConfirmation
          deleting={setDeletingConfirmation}
          deleteSnippet={deleteSnippet}
        />
      )}
    </SnippetListItem>
  );
};

export default Snippet;
