import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const ProtectedRoute = ({ children, path }) => {
  const [token, setToken] = useLocalStorage("access_token");
  const history = useHistory();
  useEffect(() => {
    if (!token) history.push("/login");
  }, [token, history]);

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};

export default ProtectedRoute;
