import React from "react";
import AddSnippet from "../molecules/AddSnippet";

import Header from "../organisms/Header";
import SnippetList from "../organisms/SnippetList";

const Home = () => {
  return (
    <>
      <Header />

      <main>
        <AddSnippet />
        <SnippetList />
      </main>
    </>
  );
};

export default Home;
