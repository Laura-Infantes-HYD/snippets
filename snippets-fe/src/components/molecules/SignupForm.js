import React, { useRef, useContext, useReducer, useEffect } from "react";
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
import { SignupValidationContext } from "../../providers/SignupValidationProvider";

const FormWrap = styled.form`
  background: ${({ theme }) => theme.secondaryDark};
  padding: 2rem 3rem;
  border-radius: 1rem;
`;

const SignupForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);
  const { errors, dispatch } = useContext(SignupValidationContext);

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const history = useHistory();

  const signUp = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const emailEmpty = isEmpty(email);
    const validPassword = isLength(password, { min: 8, max: undefined });
    const validEmail = !emailEmpty && isEmail(email);

    if (!validEmail) dispatch({ type: "invalid email" });
    if (emailEmpty) dispatch({ type: "no email" });
    if (!validPassword) dispatch({ type: "password error" });

    if (validEmail && validPassword)
      createUser({ email, password }).then(createUserSuccess);
  };

  const createUserSuccess = () => {
    formRef.current.reset();
    history.push("/message/confirmation-sent");
  };

  return (
    <FormWrap ref={formRef}>
      <Input
        label="Email"
        forwardedRef={emailRef}
        placeholder="example@email.com"
      />
      <p>{errors.email}</p>
      <Input type="password" label="Password" forwardedRef={passwordRef} />
      <p>{errors.password}</p>
      <br></br>
      {isCreating && <Loader></Loader>}
      <PositionToRight>
        <Button
          fullWidth
          type="submit"
          btnType="ctaPrimary"
          text="Sign up"
          onClick={signUp}
        />
        {`${JSON.stringify(errors)}`}
      </PositionToRight>
    </FormWrap>
  );
};

export default SignupForm;
