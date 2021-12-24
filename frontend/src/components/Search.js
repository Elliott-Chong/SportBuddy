import React from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const { searchFunc } = useGlobalContext();
  const [formData, setFormData] = React.useState({
    query: "",
    type: "both",
  });
  React.useEffect(() => {
    console.log(formData);
  }, [formData]);
  const change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { query, type } = formData;
  return (
    <form
      className="flex justify-center md:flex-row flex-col md:space-y-0 md:space-x-5 space-y-6 items-center mb-10 font-custom"
      onSubmit={(e) => {
        e.preventDefault();
        searchFunc(query, type);
      }}
    >
      <select name="type" value={type} onChange={change}>
        <option value="both">Filter by</option>
        <option value="sport">Sport</option>
        <option value="location">Location</option>
      </select>
      <input
        className="rounded-full py-3 px-6 font-bold text-2xl text-darkGrey bg-anothershadeofgrey max-w-xs"
        type="text"
        name="query"
        onChange={change}
        value={query}
      />
      <input
        type="submit"
        value="Search!"
        className="bg-siena md:py-3 md:px-6 text-white py-2 font-bold md:text-2xl text-xl rounded-sm px-4"
        style={{ borderRadius: "40px" }}
      />
    </form>
  );
};

export default Search;
