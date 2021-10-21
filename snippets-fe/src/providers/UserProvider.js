import React from "react";
import { useConfirmUserMutation } from "../services/snippets";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [
    confirmUser,
    {
      isLoading: isConfirming,
      data: user,
      isSuccess: isConfirmed,
      error: confirmationError,
    },
  ] = useConfirmUserMutation();

  return (
    <UserContext.Provider
      value={{
        user,
        confirmUser,
        isConfirming,
        isConfirmed,
        confirmationError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
