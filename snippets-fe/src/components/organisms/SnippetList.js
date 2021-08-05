import React from "react";
import { useGetSnippetsQuery } from "../../services/snippets";
import Snippet from "../molecules/Snippet";
import Loader from "../atoms/Loader";

const SnippetList = () => {
  const { data = [], error, isLoading } = useGetSnippetsQuery();

  if (isLoading) return <Loader />;

  if (error) return error.message;

  return (
    <ul>
      {data.map((snippet) => (
        <Snippet key={snippet.id} snippet={snippet}></Snippet>
      ))}
    </ul>
  );
};

export default SnippetList;
