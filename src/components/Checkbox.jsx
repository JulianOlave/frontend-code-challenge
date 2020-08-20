import React from "react";

const Checkbox = ({ label, name, className }) => (
  <label htmlFor={name} className={className}>
    <input type="checkbox" id={name} />
    <small>{label}</small>
  </label>
);

export default Checkbox;
