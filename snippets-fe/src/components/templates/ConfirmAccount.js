import React, { useEffect } from "react";
import { useConfirmUserMutation } from "../../services/snippets";
import CentralMessage from "../atoms/CentralMessage";
import Loader from "../atoms/Loader";

const ConfirmAccount = (props) => {
  const token = props.match.params.token;
  const [confirmUser, { isLoading: isConfirming, data, isSuccess }] =
    useConfirmUserMutation();

  useEffect(() => {
    confirmUser(token);
  }, []);

  return (
    <main>
      <CentralMessage>
        <h1>Confirming your account</h1>
        <div>
          <Loader />
        </div>
      </CentralMessage>
      {`${JSON.stringify(data)}`}
    </main>
  );
};

export default ConfirmAccount;
