import React from "react";

const Checkbox = ({ label, name, className, onChange, checked }) => (
  <label htmlFor={name} className={className}>
    <input type="checkbox" id={name} onChange={onChange} checked={checked} />
    <small>{label}</small>
  </label>
);

export default Checkbox;
