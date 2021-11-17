import React from "react";

const Search = () => {
  const [search, setSearch] = React.useState("");
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
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </form>
  );
};

export default Search;
