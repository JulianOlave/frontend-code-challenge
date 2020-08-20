import React from "react";

const PokemonItem = ({ data }) => (
  <li>
    <img src={data.img} alt="" />
    <div className="info">
      <h1>
        <span className="hl">{data.Name}</span>
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
