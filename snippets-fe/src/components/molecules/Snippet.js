import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tag from "../atoms/Tag";
import SnippetActions from "./SnippetActions";

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

const Snippet = ({
  snippet: { _id, name, snippet, tags, language, isFavourite = false },
  favouritePage = false,
}) => {
  const [code, setCode] = useState("");
  useEffect(() => {
    const hljs = require("highlight.js");
    setCode(hljs.highlight(snippet, { language }).value);
  });

  return (
    <>
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
          id={`snippet${_id}`}
          dangerouslySetInnerHTML={{
            __html: code,
          }}
        />
        <SnippetActions
          snippet={{ _id, name, snippet, tags, language, isFavourite }}
          favouritePage={favouritePage}
        />
      </SnippetListItem>
    </>
  );
};

export default Snippet;
