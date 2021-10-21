import React from "react";
import styled from "styled-components";

const FormWrap = styled.form`
  background: ${({ theme }) => theme.secondaryDark};
  padding: 2rem 3rem;
  border-radius: 1rem;
`;

const FormWrapper = ({ children }) => {
  return <FormWrap>{children}</FormWrap>;
};

export default FormWrapper;
