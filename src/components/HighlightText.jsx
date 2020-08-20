import React from "react";

const HighlightText = props => {
  const res = [];
  const regex = new RegExp(props.highlight, "gi");

  let lastOffset = 0;

  props.text.replace(regex, (val, offset) => {
    res.push(
      props.text.substr(lastOffset, offset - lastOffset),
      <span key={offset} className="hl">
        {val}
      </span>
    );
    lastOffset = offset + val.length;
  });
  res.push(props.text.substr(lastOffset));
  return res;
};

export default HighlightText;
