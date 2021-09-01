import React, { useState } from "react";
import Button from "../atoms/Button";
import { PositionToRight } from "../atoms/PositionToRight";
import AddSnippet from "../molecules/AddSnippet";
import SearchBar from "../molecules/SearchBar";

const SnippetListActions = ({ onSearch, searchValue }) => {
  const [showAddSnippet, setShowAddSnippet] = useState(false);

  return (
    <>
      <PositionToRight>
        <Button
          btnType="ctaPrimary"
          text="Add snippet"
          onClick={() => {
            setShowAddSnippet(true);
          }}
        />
      </PositionToRight>
      {showAddSnippet && (
        <AddSnippet show={setShowAddSnippet} action="create" />
      )}
      <SearchBar onSearch={onSearch} searchValue={searchValue} />
    </>
  );
};

export default SnippetListActions;
