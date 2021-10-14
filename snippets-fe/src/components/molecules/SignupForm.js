import React, { useRef, useReducer, useEffect } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Loader from "../atoms/Loader";
import Input from "../atoms/Input";
import { PositionToRight } from "../atoms/PositionToRight";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import { useCreateUserMutation } from "../../services/snippets";
import { useHistory } from "react-router";

const FormWrap = styled.form`
  background: ${({ theme }) => theme.secondaryDark};
  padding: 2rem 3rem;
  border-radius: 1rem;
`;

const SignupForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);
  const messages = {
    email: { required: "Provide an email address", invalid: "Invalid email" },
    password: {
      error: "Provide a password over 7 characters long",
    },
  };
  const initialFormErrState = { email: "", password: "", formValid: false };
  const errorReducer = (errors, action) => {
    switch (action.type) {
      case "password error":
        return {
          ...errors,
          password: messages.password.error,
          formValid: false,
        };
      case "no email":
        return { ...errors, email: messages.email.required, formValid: false };
      case "invalid email":
        return { ...errors, email: messages.email.invalid, formValid: false };
      case "reset errors":
        return { initialFormErrState, formValid: true };
      default:
        return errors;
    }
  };
  const [errors, dispatch] = useReducer(errorReducer, initialFormErrState);
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const history = useHistory();

  const signUp = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const emailEmpty = isEmpty(email);
    const passwordValid = isLength(password, { min: 8, max: undefined });
    const validEmail = !emailEmpty && isEmail(email);

    dispatch({ type: "reset errors" });

    if (!validEmail) dispatch({ type: "invalid email" });
    if (emailEmpty) dispatch({ type: "no email" });
    if (!passwordValid) dispatch({ type: "password error" });

    if (errors.formValid) {
      createUser({ email, password }).then(createUserSuccess);
    }
  };

  const createUserSuccess = () => {
    formRef.current.reset();
    history.push("/user-created-success");
  };

  return (
    <FormWrap ref={formRef}>
      <Input
        label="Email"
        forwardedRef={emailRef}
        placeholder="example@email.com"
      />
      <p>{errors.email}</p>
      <Input label="Password" forwardedRef={passwordRef} />
      <p>{errors.password}</p>
      <br></br>
      {isCreating && <Loader></Loader>}
      <PositionToRight>
        <p>{`${errors.formValid}`}</p>
        <Button
          fullWidth
          type="submit"
          btnType="ctaPrimary"
          text="Sign up"
          onClick={signUp}
        />
      </PositionToRight>
    </FormWrap>
  );
};

export default SignupForm;
