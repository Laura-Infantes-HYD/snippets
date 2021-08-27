import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const Search = styled.div``;

const SearchBar = ({ onSearch }) => {
  return (
    <Search>
      <Input label="Search" onChange={onSearch} />
    </Search>
  );
};

export default SearchBar;
