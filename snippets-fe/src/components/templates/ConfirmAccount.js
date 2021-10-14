import React from "react";
import CentralMessage from "../atoms/CentralMessage";
import Loader from "../atoms/Loader";

const ConfirmAccount = (props) => {
  const token = props.match.params.token;

  return (
    <main>
      <CentralMessage>
        <h1>Confirming your account</h1>
        <p>
          <Loader />
        </p>
      </CentralMessage>
    </main>
  );
};

export default ConfirmAccount;
