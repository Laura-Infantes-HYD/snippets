import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import buildUrl from "../../utils/buildUrl";
import Arrow from "../atoms/Arrow";

const PageNavigation = styled.nav`
  display: flex;
  justify-content: center;
  margin: auto;
  max-width: 400px;
  a {
    padding: 1.5rem;
    margin: 1rem;
    background: ${({ theme }) => theme.ctaSecondary};
  }
  .arrow {
    display: flex;
    align-items: center;
    padding: 0;
    background: transparent;
    path {
      fill: ${({ theme }) => theme.primaryLight};
    }
    &.next {
      transform: rotate(180deg);
    }
  }

  a.active {
    outline: solid 4px;
    outline-color: ${({ theme }) => theme.primaryLight};
    background: ${({ theme }) => theme.ctaPrimary};
  }
`;

const Pagination = ({ data, q, tags }) => {
  const { hasNextPage, hasPrevPage, page, totalPages } = data;
  const pageNumbers = [];

  const buildLocationObj = (page) => ({
    pathname: "snippets",
    search: buildUrl({ query: q, tags, page }),
  });

  for (var i = 0; i < totalPages; i++) {
    pageNumbers.push(
      <Link
        key={i}
        to={buildLocationObj(i + 1)}
        className={i + 1 == page ? "active" : ""}
      >
        {i + 1}
      </Link>
    );
  }

  return (
    <PageNavigation>
      {hasPrevPage && (
        <Link to={buildLocationObj(page - 1)} className="arrow previous">
          <Arrow title="previous page" />
        </Link>
      )}
      {pageNumbers}
      {hasNextPage && (
        <Link to={buildLocationObj(page + 1)} className="arrow next">
          <Arrow title="next page" />
        </Link>
      )}
    </PageNavigation>
  );
};

export default Pagination;
