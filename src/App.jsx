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
    filterPokemons(value);
  };

  const filterPokemons = value => {
    const dataFiltered = pokemonsData.filter(pokemonData => {
      if (pokemonData.Name.indexOf(value) > -1 || pokemonData.Types.some(type => type.indexOf(value) > -1)) {
        return true;
      }
    });

    setFilteredPokemons(dataFiltered.slice(0, 4));
  };

  return (
    <>
      <Checkbox name="maxCP" label="Maximum Combat Points" className="max-cp" />
      <InputSearch onChange={searchInputChangeHandler} value={searchInputText} />
      {isLoading ? (
        <Loader />
      ) : (
        <SuggestionsList>
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map(pokemonData => <PokemonItem key={pokemonData.Name} data={pokemonData} />)
          ) : (
            <EmptyItem />
          )}
        </SuggestionsList>
      )}
    </>
  );
};

export default App;
