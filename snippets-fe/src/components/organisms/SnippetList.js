import React from "react";
import Snippet from "../molecules/Snippet";
import Loader from "../atoms/Loader";

const SnippetList = ({ snippets, error, isLoading }) => {
  if (isLoading) return <Loader />;
  if (error) return error.message;

  return (
    <ul>
      {snippets.map((snippet) => (
        <Snippet key={snippet.id} snippet={snippet}></Snippet>
      ))}
    </ul>
  );
};

export default SnippetList;
