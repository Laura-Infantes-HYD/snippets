import React from "react";
import styled from "styled-components";
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
  const hardCodedTags = [
    "CRO",
    "Helper",
    "Redux",
    "Frontend",
    "Backend",
    "Node",
  ];

  return (
    <Tags ref={forwardedRef}>
      <legend>Tags</legend>
      {hardCodedTags.map((tag) => (
        <Checkbox
          key={tag}
          label={tag}
          checked={initiallySelected.includes(tag)}
        />
      ))}
    </Tags>
  );
};

export default TagsSelector;
