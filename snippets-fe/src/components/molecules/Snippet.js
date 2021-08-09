import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRemoveSnippetMutation } from "../../services/snippets";
import Modal from "../organisms/Modal";
import Tag from "../atoms/Tag";
import DeleteSnippetConfirmation from "./DeleteSnippetConfirmation";
import DangerBtn from "../atoms/DangerBtn";

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

const Snippet = ({ snippet: { id, name, snippet, tags, language } }) => {
  const [removeSnippet] = useRemoveSnippetMutation();
  const deleteSnippet = () => {
    removeSnippet(id);
  };

  const [code, setCode] = useState("");
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const openModal = () => {
    setDeleteModalOpened(true);
  };
  const closeModal = () => {
    setDeleteModalOpened(false);
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
      ></pre>

      <DangerBtn
        className="btn--float-right"
        onClick={openModal}
        text="Remove"
      />

      {deleteModalOpened && (
        <Modal closeModal={closeModal}>
          <DeleteSnippetConfirmation deleteSnippet={deleteSnippet} />
        </Modal>
      )}
    </SnippetListItem>
  );
};

export default Snippet;
