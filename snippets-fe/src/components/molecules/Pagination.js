import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import buildUrl from "../../utils/buildUrl";
import Arrow from "../atoms/Arrow";
import Previous from "../atoms/Previous";

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
    margin: 0;
    padding: 0;
    background: transparent;
    path {
      fill: ${({ theme }) => theme.primaryLight};
    }
    &.next svg {
      transform: rotate(180deg);
    }
  }
  .skip {
    margin: 1rem
  }
  a.active {
    outline: solid 4px;
    outline-color: ${({ theme }) => theme.primaryLight};
    background: ${({ theme }) => theme.ctaPrimary};
  }

  a.hide {
    display: none;
  }
  .dots--prev {
    margin-left: 0.5rem;
  }
  .dots--next {
    margin-right: 0.5rem;
  }
  }
`;

const Pagination = ({ data, q, tags }) => {
  const { hasNextPage, hasPrevPage, page, totalPages } = data;
  const pageNumbers = [];
  const activeRoute = useLocation().pathname;

  const buildLocationObj = (page) => ({
    pathname: activeRoute,
    search: buildUrl({ query: q, tags, page }),
  });

  const classNames = (classes) => {
    let classNames = "";
    for (let className in classes) {
      if (classes[className]) {
        classNames += ` ${className}`;
      }
    }
    return classNames;
  };

  for (var i = 0; i < totalPages; i++) {
    const current = i + 1;

    var linkClasses = classNames({
      active: current === page,
      hide: current < page - 2 || current > page + 2,
    });

    pageNumbers.push(
      <Link key={i} to={buildLocationObj(current)} className={linkClasses}>
        {current}
      </Link>
    );
  }

  return (
    <PageNavigation>
      {page > 1 && (
        <Link to={buildLocationObj(1)} className="arrow skip">
          <Previous />
        </Link>
      )}
      {hasPrevPage && (
        <Link to={buildLocationObj(page - 1)} className="arrow previous">
          <Arrow title="previous page" />
          {/* {page > 3 && <p className="dots--prev">...</p>} */}
        </Link>
      )}
      {pageNumbers}
      {hasNextPage && (
        <Link to={buildLocationObj(page + 1)} className="arrow next">
          {/* {page < totalPages - 2 && <p className="dots--next">...</p>} */}
          <Arrow title="next page" />
        </Link>
      )}
      {page < totalPages && (
        <Link to={buildLocationObj(totalPages)} className="arrow skip next">
          <Previous />
        </Link>
      )}
    </PageNavigation>
  );
};

export default Pagination;
