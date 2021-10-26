import React from "react";
import {
  useConfirmUserMutation,
  useGetProfileMutation,
  useLoginMutation,
} from "../services/snippets";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  let user;
  const [token, setToken] = useLocalStorage("access_token");
  const [login, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();
  const [
    getProfile,
    { isLoading: fetchingProfile, error: profileError, data: profile },
  ] = useGetProfileMutation();
  const [
    confirmUser,
    {
      isLoading: isConfirming,
      data: confirmedUser,
      isSuccess: isConfirmed,
      error: confirmationError,
    },
  ] = useConfirmUserMutation();

  const loginUser = (user) => {
    login(user).then(({ data: token }) => {
      if (token) setToken(token);
      getProfile(token).then((res) => console.log("profile", res));
    });
  };

  user = confirmedUser;

  return (
    <UserContext.Provider
      value={{
        confirmedUser,
        profile,
        confirmUser,
        isConfirming,
        isConfirmed,
        confirmationError,
        login: loginUser,
        loginError,
        isLoggingIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
