import React, { useState, useEffect } from "react";
import Input from "./Input";
import List from "./List";
import Paginate from "./Paginate";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filterPoke, setfilterPoke] = useState([]);
  const [isShiny, setisShiny] = useState(false);
  const [gen, setgen] = useState(1);

  // this part is for pagination. Keep track and calculate the current page and content of current page
  const [currentPagePoke, setcurrentPagePoke] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokePerPage = 18;
  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation/${gen}`)
      .then((res) => res.json())
      .then((json) => {
        json.pokemon_species.map((item) => {
          // add Dex# as the id as item attribute to the list
          // the url of each poke is 'https://pokeapi.co/api/v2/pokemon-species/1/'.  The Dex# is the 7th item
          item.id = item.url.split("/")[6];
          return item;
        });
        //the api fetch should be called only when page or new Gen is loaded
        console.log("Pokemon list fetched");

        //The result is unsorted list of Pokemons, so need to sort them by id
        const compare = (a, b) => {
          if (parseInt(a.id) < parseInt(b.id)) {
            return -1;
          }
          if (parseInt(a.id) > parseInt(b.id)) {
            return 1;
          }
          return 0;
        };

        //When each Generation of Pokemon is loaded. Initiate the list of Pokemon (all poke, filter poke and current page of poke)
        setPokemons(json.pokemon_species.sort(compare));
        setfilterPoke(json.pokemon_species.sort(compare));
        setcurrentPagePoke(
          json.pokemon_species
            .sort(compare)
            .slice(indexOfFirstPoke, indexOfLastPoke)
        );
      });
  }, [gen]);

  useEffect(() => {
    // trigger only when page is changed
    console.log("Show current page of Pokemon");
    setcurrentPagePoke(filterPoke.slice(indexOfFirstPoke, indexOfLastPoke));
  }, [indexOfFirstPoke, indexOfLastPoke]);

  const onChangeHandler = (event) => {
    const comparePokemon = pokemons.filter((item) => {
      return item.name.includes(event.target.value.toLowerCase());
    });
    setCurrentPage(1); //reset current page back to first page
    setfilterPoke(comparePokemon);
    setcurrentPagePoke(comparePokemon.slice(indexOfFirstPoke, indexOfLastPoke));
  };

  const onCheckHandler = (event) => {
    setisShiny(event.target.checked);
  };

  const onSelectHandler = (event) => {
    document.getElementById("searchPoke").value = "";
    setgen(event.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const PreviousOrNext = (action) => {
    if (action === "previous") {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (action === "next") {
      if (currentPage !== Math.ceil(filterPoke.length / pokePerPage)) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      setCurrentPage(1);
      console.log("Invalid Page Action");
    }
  };

  return (
    <>
      <h1>Pokemon</h1>
      <Input
        onChangeHandler={onChangeHandler}
        onCheckHandler={onCheckHandler}
        onSelectHandler={onSelectHandler}
      />
      <List pokemonList={currentPagePoke} isShiny={isShiny} />
      <Paginate
        pokePerPage={pokePerPage}
        totalPokes={filterPoke.length}
        paginate={paginate}
        PreviousOrNext={PreviousOrNext}
      />
    </>
  );
}

export default App;
