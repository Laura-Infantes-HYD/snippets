import React from "react";

const Checkbox = ({ label, checked = false }) => {
  return (
    <>
      <input
        type="checkbox"
        value={label}
        id={label}
        defaultChecked={checked}
      ></input>
      <label htmlFor={label}>{label}</label>
    </>
  );
};

export default Checkbox;
