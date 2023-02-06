import React from "react";

export default function List({ pokemonList, isShiny }) {
  return (
    <ul className="ul-container">
      {pokemonList &&
        pokemonList.map((item) => {
          return (
            <div key={item.id}>
              <a
                target="_blank"
                href={`https://bulbapedia.bulbagarden.net/wiki/${item.name}`}
              >
                <li>{item.name}</li>
              </a>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  isShiny ? "shiny" : ""
                }/${item.id}.png`}
              />
            </div>
          );
        })}
    </ul>
  );
}
