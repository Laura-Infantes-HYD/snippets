import React, { useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import Button from "../atoms/Button";
import FormWrapper from "../atoms/FormWrapper";
import Loader from "../atoms/Loader";
import Input from "../atoms/Input";
import { UserContext } from "../../providers/UserProvider";

const LoginForm = () => {
  const history = useHistory();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login, isLoggingIn, loginError, isProfileFetchSuccess } =
    useContext(UserContext);

  const loginUser = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    login({ email, password });
  };

  useEffect(() => {
    if (isProfileFetchSuccess) history.push("/snippets");
  }, [isProfileFetchSuccess, history]);

  return (
    <FormWrapper>
      <Input label="Email" forwardedRef={emailRef} />
      <Input type="password" label="Password" forwardedRef={passwordRef} />
      <br></br>
      {isLoggingIn && <Loader></Loader>}

      <Button
        fullWidth
        type="submit"
        btnType="ctaPrimary"
        text="Login"
        onClick={loginUser}
      />
      {loginError?.message}
    </FormWrapper>
  );
};

export default LoginForm;
