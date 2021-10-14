import React from "react";
import styled from "styled-components";
import Card from "../atoms/Card";

const Message = styled.section`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    margin-bottom: ${({ theme }) => theme.spacerMd};
  }
  p {
    font-size: ${({ theme }) => theme.fontMd};
    line-height: ${({ theme }) => theme.spacerMd};
  }
`;

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
      <Message>
        <div className="message-content">
          <h1>{header}</h1>
          <p>{body}</p>
        </div>
      </Message>
    </main>
  );
};

export default MessageScreen;
