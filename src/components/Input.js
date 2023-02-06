import React from "react";

export default function Input({
  onChangeHandler,
  onCheckHandler,
  onSelectHandler
}) {
  return (
    <>
      <input
        type="search"
        onChange={onChangeHandler}
        placeholder="Search Pokemon!"
        id="searchPoke"
      />
      &nbsp;
      <label>Generation:</label>
      <select onChange={onSelectHandler}>
        <option value="1">I</option>
        <option value="2">II</option>
        <option value="3">III</option>
        <option value="4">IV</option>
        <option value="5">V</option>
        <option value="6">VI</option>
        <option value="7">VII</option>
        <option value="8">VIII</option>
      </select>
      &nbsp;
      <input type="checkbox" id="shinyCheckbox" onClick={onCheckHandler} />
      <label htmlFor="shinyCheckbox">Shiny!</label>
    </>
  );
}
