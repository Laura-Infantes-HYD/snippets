import React from "react";
import { useGetFavouriteSnippetsQuery } from "../../services/snippets";
import Snippet from "../molecules/Snippet";
import Loader from "../atoms/Loader";
import Card from "../atoms/Card";

const FavouritesList = () => {
  const { data = [], error, isLoading } = useGetFavouriteSnippetsQuery();

  if (isLoading) return <Loader />;

  if (error) return error.message;

  if (data.length === 0)
    return (
      <Card>
        <h3>You have no favourites yet</h3>
      </Card>
    );

  return (
    <ul>
      {data.map((snippet) => (
        <Snippet key={snippet.id} snippet={snippet} favouritePage={true} />
      ))}
    </ul>
  );
};

export default FavouritesList;
