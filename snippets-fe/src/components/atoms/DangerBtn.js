import styled from "styled-components";
import Button from "./Button";

const DangerBtn = styled(Button)`
  padding: 0.65rem;
  background: ${({ theme }) => theme.danger};
`;

export default DangerBtn;
