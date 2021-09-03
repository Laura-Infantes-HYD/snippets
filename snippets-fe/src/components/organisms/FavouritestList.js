import React, { useState, useEffect } from "react";
import { useGetFavouriteSnippetsQuery } from "../../services/snippets";
import Snippet from "../molecules/Snippet";
import Loader from "../atoms/Loader";
import Card from "../atoms/Card";
import Pagination from "../molecules/Pagination";
import useQuery from "../../hooks/useQuery";

const FavouritesList = () => {
  const pageQuery = useQuery("page");
  const [page, setPage] = useState(pageQuery);

  useEffect(() => {
    setPage(pageQuery);
  }, [pageQuery]);

  const {
    data = [],
    error,
    isLoading,
  } = useGetFavouriteSnippetsQuery({ page });

  if (isLoading) return <Loader />;
  if (error) return error.message;

  if (data.docs.length === 0)
    return (
      <Card>
        <h3>You have no favourites yet</h3>
      </Card>
    );

  return (
    <>
      <ul>
        {data.docs.map((snippet) => (
          <Snippet key={snippet._id} snippet={snippet} favouritePage={true} />
        ))}
      </ul>
      <Pagination data={data} />
    </>
  );
};

export default FavouritesList;
