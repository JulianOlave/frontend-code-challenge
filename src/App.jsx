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
  const [pokemonsData, setPokemonsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [isMaxCPChecked, setIsMaxCPChecked] = useState(false);

  const fetchPokemons = async () => {
    setIsLoading(true);
    let response = [];
    try {
      response = await fetch(URL_PATH);
      response = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      window._jio = response;
      setPokemonsData(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(pokemonsData);
  }, [pokemonsData]);

  const searchInputChangeHandler = async e => {
    const value = e.target.value;
    setSearchInputText(value);
    value && filterPokemons(value);
    !value && setFilteredPokemons(pokemonsData);
  };

  const maxCPCheckboxHandler = e => {
    const checked = e.target.checked;
    setIsMaxCPChecked(checked);
    if (!searchInputText.trim()) {
      setFilteredPokemons(checked ? sortBy.maxCP(pokemonsData) : pokemonsData);
    } else {
      filterPokemons(searchInputText, checked);
    }
  };

  const sortBy = {
    name: arr => [...arr].sort((a, b) => a.Name.localeCompare(b.Name)),
    type: arr => [...arr].sort((a, b) => (a.Types[0] ? a.Types[0].localeCompare(b.Types[0]) : -1)),
    maxCP: arr => [...arr].sort((a, b) => b.MaxCP - a.MaxCP),
    default: arr => arr
  };

  const filterPokemons = (value, byMaxCP = false) => {
    value = value.toUpperCase();
    let sortType = "default";

    const dataFiltered = !value
      ? pokemonsData
      : pokemonsData.filter(pokemonData => {
          if (
            pokemonData.Name.toUpperCase().indexOf(value) > -1 ||
            pokemonData.Types.some(type => type.toUpperCase().indexOf(value) > -1)
          ) {
            if (pokemonData.Name.toUpperCase().indexOf(value) > -1) {
              sortType = "name";
            } else {
              sortType = "type";
            }
            return true;
          }
          return false;
        });
    sortType = byMaxCP ? "maxCP" : sortType;
    const sortedData = sortBy[sortType](dataFiltered);
    setFilteredPokemons(sortedData.slice(0, 4));
  };

  return (
    <>
      <Checkbox
        name="maxCP"
        label="Maximum Combat Points"
        className="max-cp"
        onChange={maxCPCheckboxHandler}
        checked={isMaxCPChecked}
      />
      <InputSearch onChange={searchInputChangeHandler} value={searchInputText} />
      {isLoading ? (
        <Loader />
      ) : (
        <SuggestionsList>
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map(pokemonData => (
              <PokemonItem key={pokemonData.Number} data={pokemonData} searchedValue={searchInputText} />
            ))
          ) : (
            <EmptyItem />
          )}
        </SuggestionsList>
      )}
    </>
  );
};

export default App;
