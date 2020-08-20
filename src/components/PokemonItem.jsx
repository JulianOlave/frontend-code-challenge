import React from "react";

const PokemonItem = props => (
  <li key={props.Name}>
    <img src={props.data.img} alt="" />
    <div className="info">
      <h1>
        <span className="hl">{props.data.Name}</span>
      </h1>
      {props.data.Types.map(type => (
        <span className="type electric">{type}</span>
      ))}
    </div>
  </li>
);

export default PokemonItem;
