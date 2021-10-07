import React from "react";
import styled from "styled-components";

const TextInput = styled.input`
  display: block;
  padding: 0.75rem;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacerSm};
  margin-top: ${({ theme }) => theme.spacerXs};
`;

const Input = ({
  type = "text",
  label,
  placeholder = "",
  forwardedRef,
  defaultValue = "",
  onChange = () => {},
}) => {
  return (
    <label>
      {label}
      <TextInput
        type={type}
        placeholder={placeholder}
        ref={forwardedRef}
        defaultValue={defaultValue}
        onChange={(e) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
      ></TextInput>
    </label>
  );
};

export default Input;
