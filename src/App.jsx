import React, { useState, useEffect } from "react";
import "./App.css";

import PokemonItem from "./components/PokemonItem";
import SuggestionsList from "./components/SuggestionList";
import EmptyItem from "./components/EmptyItem";
import Loader from "./components/Loader";
import InputSearch from "./components/InputSearch";
import Checkbox from "./components/Checkbox";

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
  const [searchInputText, setSearchInputText] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  const fetchPokemons = async () => {
    let response = [];
    try {
      response = await fetch(URL_PATH);
      response = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setPokemonData(response);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const searchInputChangeHandler = async e => {
    const value = e.target.value;
    setSearchInputText(value);
    let data = await fetchPokemons();

    if (data !== null) {
      const dataFiltered = data.filter(pok => {
        if (pok.Name.indexOf(value) > -1) {
          return true;
        }
      });

      console.log(dataFiltered);

      setPokemonData(data);
    }
  };

  return (
    <>
      <Checkbox name="maxCP" label="Maximum Combat Points" className="max-cp" />
      <InputSearch onChange={searchInputChangeHandler} value={searchInputText} />
      <SuggestionsList>
        {pokemonData.map(pokemon => (
          <PokemonItem data={pokemon} />
        ))}
      </SuggestionsList>
    </>
  );
};

export default App;
