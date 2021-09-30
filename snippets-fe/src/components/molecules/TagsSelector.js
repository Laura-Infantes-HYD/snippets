import React from "react";
import styled from "styled-components";
import { useGetTagsQuery } from "../../services/snippets";
import Checkbox from "../atoms/Checkbox";

const Tags = styled.fieldset`
  margin-top: ${({ theme }) => theme.spacerSm};
  margin-bottom: ${({ theme }) => theme.spacerMd};

  legend {
    margin-bottom: ${({ theme }) => theme.spacerXs};
  }

  label {
    margin-right: ${({ theme }) => theme.spacerXs};
    cursor: pointer;
  }
`;

const TagsSelector = ({ forwardedRef, initiallySelected }) => {
  const { data = [] } = useGetTagsQuery();

  return (
    <Tags ref={forwardedRef}>
      <legend>Tags</legend>
      {data.map((item) => (
        <Checkbox
          key={item._id}
          label={item.tag}
          checked={initiallySelected.includes(item.tag)}
        />
      ))}
    </Tags>
  );
};

export default TagsSelector;
