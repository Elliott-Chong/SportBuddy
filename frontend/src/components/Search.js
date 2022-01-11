import React from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const { searchFunc, dispatch, state } = useGlobalContext();
  const {
    search: { query, type },
  } = state;
  const change = (e) => {
    dispatch({
      type: "SET_SEARCH",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <form
      className="flex justify-center md:flex-row flex-col md:space-y-0 md:space-x-5 space-y-6 items-center mb-10 font-custom"
      onSubmit={(e) => {
        e.preventDefault();
        searchFunc(query, type);
      }}
    >
      <select
        name="type"
        value={type}
        className="py-2 px-4 bg-siena md:text-xl text-lg font-bold text-white rounded-[10px]"
        onChange={change}
      >
        <option value="both">Filter by</option>
        <option value="sport">Sport</option>
        <option value="location">Location</option>
      </select>
      <input
        className="rounded-full py-3 px-6 font-bold text-2xl text-darkGrey bg-anothershadeofgrey max-w-xs"
        type="text"
        placeholder="Search"
        name="query"
        onChange={change}
        value={query}
      />
      <input
        type="submit"
        value="Go"
        className="bg-siena md:py-2 md:px-4 text-white py-2 font-bold md:text-2xl text-xl rounded-[15px] px-4"
        onClick={() => {
          searchFunc(query, type);
        }}
      />
    </form>
  );
};

export default Search;
