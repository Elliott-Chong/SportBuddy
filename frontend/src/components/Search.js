import React from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const {
    state: { search },
    dispatch,
  } = useGlobalContext();
  return (
    <form
      className="flex justify-center align-center mb-10 font-custom"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="rounded-full py-3 px-6 font-bold text-2xl search bg-anothershadeofgrey max-w-xs"
        type="text"
        name="search"
        placeholder="search"
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", payload: e.target.value })
        }
        value={search}
      />
    </form>
  );
};

export default Search;
