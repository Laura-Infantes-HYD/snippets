import React, { useState } from "react";
import Snippet from "../molecules/Snippet";
import Loader from "../atoms/Loader";
import {
  useFindSnippetsQuery,
  useGetSnippetsQuery,
} from "../../services/snippets";
import SnippetListActions from "./SnippetListActions";
import useQuery from "../../hooks/useQuey";

const SnippetList = () => {
  const query = useQuery("q");
  const [searchTerm, setSearchTerm] = useState(query || "");
  const { data = [], error, isLoading } = useGetSnippetsQuery(searchTerm);

  if (isLoading) return <Loader />;
  if (error) return error.message;

  return (
    <>
      <SnippetListActions onSearch={setSearchTerm} searchValue={searchTerm} />
      <ul>
        {data.docs.map((snippet) => (
          <Snippet key={snippet.id} snippet={snippet}></Snippet>
        ))}
      </ul>
    </>
  );
};

export default SnippetList;
