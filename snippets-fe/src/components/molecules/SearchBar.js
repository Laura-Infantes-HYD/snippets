import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useQuery from "../../hooks/useQuery";

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  label {
    display: none;
  }
  ,
  input {
    flex-grow: 1;
    padding: 0.75rem;
    margin-bottom: ${({ theme }) => theme.spacerSm};
    margin-top: ${({ theme }) => theme.spacerXs};
    outline-color: ${({ theme }) => theme.ctaPrimary};
  }
`;

const SearchCta = styled.div`
padding: 1rem 1.25rem;
margin-left: ${({ theme }) => theme.spacerXs};
background:  ${({ theme }) => theme.ctaSecondary}};
color: ${({ theme }) => theme.primaryLight}};
letter-spacing: 1.5px;
border-radius: 0.5rem;
cursor: pointer}
`;

const SearchBar = ({ onSearch, searchValue = "" }) => {
  const inputRef = useRef(null);
  const tagsQuery = useQuery("tags");
  const linkRef = useRef(null);

  useLayoutEffect(() => {
    if (searchValue) inputRef.current.focus();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        linkRef.current.click();
      }}
    >
      <Search>
        <label>Search </label>

        <input
          type="text"
          value={searchValue}
          ref={inputRef}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
          placeholder="Search an snippet by name"
        />

        <Link
          ref={linkRef}
          to={{
            pathname: "/snippets",
            search: `${
              tagsQuery ? "tags=" + tagsQuery + "&" : ""
            }?q=${searchValue}`,
          }}
        >
          <SearchCta>Search</SearchCta>
        </Link>
      </Search>
    </form>
  );
};

export default SearchBar;
