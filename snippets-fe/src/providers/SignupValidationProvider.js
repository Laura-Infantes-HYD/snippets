import React, { useReducer } from "react";

export const SignupValidationContext = React.createContext();

const SignupValidationProvider = ({ children }) => {
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
      case "form valid":
        return { email: "", password: "", formValid: true };
      default:
        return errors;
    }
  };
  const [errors, dispatch] = useReducer(errorReducer, initialFormErrState);

  return (
    <SignupValidationContext.Provider
      value={{
        errors,
        dispatch,
      }}
    >
      {children}
    </SignupValidationContext.Provider>
  );
};

export default SignupValidationProvider;
