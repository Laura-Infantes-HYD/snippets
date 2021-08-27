import React from "react";
import { useGetSnippetsQuery } from "../../services/snippets";
import SnippetList from "../organisms/SnippetList";
import SnippetListActions from "../organisms/SnippetListActions";

const Home = () => {
  const { data = [], error, isLoading } = useGetSnippetsQuery();
  const searchResults = [];
  return (
    <main>
      <SnippetListActions />
      <SnippetList snippets={data} error={error} isLoading={isLoading} />
    </main>
  );
};

export default Home;
