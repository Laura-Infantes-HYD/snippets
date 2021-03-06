import React from "react";
import styled from "styled-components";

let Button = ({
  text,
  className = "",
  label,
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      aria-label={label || text}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
};

Button = styled(Button)`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  padding: 1rem 1.25rem;
  background:  ${({ disabled, theme, btnType }) =>
    disabled ? theme.inactive : theme[btnType]}};
  color: ${({ theme }) => theme.primaryLight}};
  letter-spacing: 1.5px;
  border: none;
  border-radius: 0.5rem;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")}};
`;

export default Button;
