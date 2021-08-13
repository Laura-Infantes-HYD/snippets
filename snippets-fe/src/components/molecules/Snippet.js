import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRemoveSnippetMutation } from "../../services/snippets";
import Modal from "../organisms/Modal";
import Tag from "../atoms/Tag";
import DeleteSnippetConfirmation from "./DeleteSnippetConfirmation";
import Button from "../atoms/Button";

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
  const [code, setCode] = useState("");
  const [deleting, setDeleting] = useState(false);

  const deleteSnippet = () => {
    removeSnippet(id).then(() => setDeleting(false));
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

      <Button
        btnType="danger"
        className="btn--float-right"
        onClick={() => setDeleting(true)}
        text="Remove"
      />

      {deleting && (
        <DeleteSnippetConfirmation
          deleting={setDeleting}
          deleteSnippet={deleteSnippet}
        />
      )}
    </SnippetListItem>
  );
};

export default Snippet;
