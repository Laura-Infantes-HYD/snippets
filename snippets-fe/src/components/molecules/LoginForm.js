import React, { useRef } from "react";
import Button from "../atoms/Button";
import FormWrapper from "../atoms/FormWrapper";
import Input from "../atoms/Input";
import { PositionToRight } from "../atoms/PositionToRight";

const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);
  const login = () => {};

  return (
    <FormWrapper ref={formRef}>
      <Input label="Email" forwardedRef={emailRef} />
      <Input type="password" label="Password" forwardedRef={passwordRef} />
      <br></br>
      {/* {isLoggingIn && <Loader></Loader>} */}
      <PositionToRight>
        <Button
          fullWidth
          type="submit"
          btnType="ctaPrimary"
          text="Login"
          onClick={login}
        />
      </PositionToRight>
    </FormWrapper>
  );
};

export default LoginForm;
