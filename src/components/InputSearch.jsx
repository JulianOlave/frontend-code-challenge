import React from "react";

const InputSearch = ({ value, onChange }) => (
  <input type="text" className="input" placeholder="Pokemon or type" vaue={value} onChange={onChange} />
);

export default InputSearch;
