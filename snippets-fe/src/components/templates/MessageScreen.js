import React from "react";
import styled from "styled-components";
import Card from "../atoms/Card";
import CentralMessage from "../atoms/CentralMessage";

const messages = {
  "confirmation-sent": {
    header: "Check your inbox",
    body: "We have sent an email to the provided email address. Click the link on the email to confirm your account.",
  },
};

const MessageScreen = (props) => {
  const type = props.match.params.type;
  const { header, body } = messages[type];

  return (
    <main>
      <CentralMessage>
        <div className="message-content">
          <h1>{header}</h1>
          <p>{body}</p>
        </div>
      </CentralMessage>
    </main>
  );
};

export default MessageScreen;
