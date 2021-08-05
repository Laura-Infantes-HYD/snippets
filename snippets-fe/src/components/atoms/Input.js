import React from "react";
import styled from "styled-components";

const TextInput = styled.input`
  display: block;
  padding: 0.75rem;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacerSm};
  margin-top: ${({ theme }) => theme.spacerXs};
`;

const Input = ({ label, placeholder = "", forwardedRef }) => {
  return (
    <>
      <label>
        {label}
        <TextInput
          type="text"
          placeholder={placeholder}
          ref={forwardedRef}
        ></TextInput>
      </label>
    </>
  );
};

export default Input;
