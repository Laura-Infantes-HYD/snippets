import { useLocation } from "react-router-dom";

export default (param) => {
  return new URLSearchParams(useLocation().search).get(param);
};
