import React from "react";

const Textarea = ({ label, placeholder = "", forwardedRef }) => {
  return (
    <label>
      {label}
      <textarea placeholder={placeholder} ref={forwardedRef}></textarea>
    </label>
  );
};

export default Textarea;
