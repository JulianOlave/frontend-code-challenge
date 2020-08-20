import React from "react";

import HighlightText from "./HighlightText";

const PokemonItem = ({ data, searchedValue }) => (
  <li>
    <img src={data.img} alt="" />
    <div className="info">
      <h1>
        <HighlightText highlight={searchedValue} text={data.Name} />
      </h1>
      {data.Types.map(type => (
        <span key={type} className="type electric">
          {type}
        </span>
      ))}
    </div>
  </li>
);

export default PokemonItem;
