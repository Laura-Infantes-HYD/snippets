import React from "react";
import styled from "styled-components";

const Selector = styled.div`
  margin-top: ${({ theme }) => theme.spacerMd};

  select {
    display: block;
    padding: 0.75rem;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacerSm};
    margin-top: ${({ theme }) => theme.spacerXs};
  }
`;

const Select = ({ label, forwardedRef, options }) => {
  return (
    <Selector>
      <label htmlFor={label}>{label} </label>

      <select name={label} id={label} ref={forwardedRef}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Selector>
  );
};

export default Select;
