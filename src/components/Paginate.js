import React from "react";

export default function Paginate({
  pokePerPage,
  totalPokes,
  paginate,
  PreviousOrNext
}) {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokes / pokePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li
          onClick={() => {
            PreviousOrNext("previous");
          }}
          className="page-number"
        >
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className="page-number"
          >
            {number}
          </li>
        ))}
        <li
          onClick={() => {
            PreviousOrNext("next");
          }}
          className="page-number"
        >
          Nex
        </li>
      </ul>
    </div>
  );
}
