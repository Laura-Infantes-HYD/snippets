import React, { useState } from "react";
import Snippet from "../molecules/Snippet";
import Loader from "../atoms/Loader";
import {
  useFindSnippetsQuery,
  useGetSnippetsQuery,
} from "../../services/snippets";
import SnippetListActions from "./SnippetListActions";
import { useLocation } from "react-router-dom";

const SnippetList = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const { data = [], error, isLoading } = useGetSnippetsQuery();
  console.log("data: ", data);
  // const { data: foundSnippets } = useFindSnippetsQuery(searchTerm);
  // const snipeptsToRender = searchTerm ? foundSnippets : snippets.docs;

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();

  if (isLoading) return <Loader />;
  if (error) return error.message;

  return (
    <>
      <SnippetListActions onSearch={setSearchTerm} />
      <ul>
        {data.docs.map((snippet) => (
          <Snippet key={snippet.id} snippet={snippet}></Snippet>
        ))}
      </ul>
    </>
  );
};

export default SnippetList;
