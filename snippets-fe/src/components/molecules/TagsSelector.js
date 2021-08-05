import React from "react";
import styled from "styled-components";
import Checkbox from "../atoms/Checkbox";

const TagsSelector = ({ forwardedRef }) => {
  const hardCodedTags = [
    "CRO",
    "Helper",
    "Redux",
    "Frontend",
    "Backend",
    "Node",
  ];

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

  return (
    <Tags ref={forwardedRef}>
      <legend>Tags</legend>
      {hardCodedTags.map((tag) => (
        <Checkbox key={tag} label={tag} />
      ))}
    </Tags>
  );
};

export default TagsSelector;
