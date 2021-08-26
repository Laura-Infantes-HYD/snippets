import React from "react";
import AddSnippet from "../molecules/AddSnippet";

import Header from "../organisms/Header";
import SnippetList from "../organisms/SnippetList";
import SnippetListActions from "../organisms/SnippetListActions";

const Home = () => {
  return (
    <main>
      {/* <AddSnippet /> */}
      <SnippetListActions />
      <SnippetList />
    </main>
  );
};

export default Home;
