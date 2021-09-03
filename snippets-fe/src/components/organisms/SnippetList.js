import React, { useState, useEffect } from "react";
import Snippet from "../molecules/Snippet";
import Loader from "../atoms/Loader";
import { useGetSnippetsQuery } from "../../services/snippets";
import SnippetListActions from "./SnippetListActions";
import useQuery from "../../hooks/useQuery";
import Pagination from "../molecules/Pagination";

const SnippetList = () => {
  const searchQuery = useQuery("q");
  const pageQuery = useQuery("page");
  const tagsQuery = useQuery("tags");
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [page, setPage] = useState(pageQuery);
  const [tags, setTags] = useState(tagsQuery);
  const {
    data = [],
    error,
    isLoading,
  } = useGetSnippetsQuery({ query: searchTerm, page });

  useEffect(() => {
    setPage(pageQuery);
    setSearchTerm(searchQuery);
  }, [pageQuery, searchQuery]);

  if (isLoading) return <Loader />;
  if (error) return error.message;

  return (
    <>
      <SnippetListActions
        onSearch={(term) => {
          setSearchTerm(term);
          setPage(null); //resets to first page after search
        }}
        searchValue={searchTerm}
      />
      <ul>
        {data.docs.map((snippet) => {
          return <Snippet key={snippet._id} snippet={snippet}></Snippet>;
        })}
      </ul>
      <Pagination data={data} q={searchTerm} tags={tags} />
    </>
  );
};

export default SnippetList;
