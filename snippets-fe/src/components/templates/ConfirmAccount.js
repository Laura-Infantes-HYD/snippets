import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../providers/UserProvider";
import CentralMessage from "../atoms/CentralMessage";
import Loader from "../atoms/Loader";

const ConfirmAccount = (props) => {
  const history = useHistory();
  const token = props.match.params.token;
  const { confirmUser, isConfirming, confirmationError, isConfirmed } =
    useContext(UserContext);

  useEffect(() => {
    confirmUser(token).then(() => {
      if (isConfirmed) history.push("/snippets");
    });
  }, [token, isConfirmed]);

  return (
    <main>
      <CentralMessage>
        <h1>Confirming your account</h1>
        <div>{isConfirming && <Loader />}</div>
        <p>{confirmationError}</p>
      </CentralMessage>
    </main>
  );
};

export default ConfirmAccount;
