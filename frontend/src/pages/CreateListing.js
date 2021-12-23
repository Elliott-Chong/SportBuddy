import React from "react";
import { useGlobalContext } from "../context";
import { useHistory } from "react-router-dom";

const CreateListing = () => {
  const { createListing } = useGlobalContext();
  const [formData, setFormData] = React.useState({
    location: "",
    date: "",
    sport: "",
    slotsLeft: "",
    remarks: "",
  });
  const { location, date, sport, slotsLeft, remarks } = formData;
  const history = useHistory();
  const submit = (e) => {
    e.preventDefault();
    createListing(location, date, sport, slotsLeft, remarks, history);
  };
  const change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 className="md:text-7xl text-5xl text-center mb-5 md:mb-10 text-yellow font-bold">
        Create a Listing
      </h1>
      <form
        className="flex flex-col space-y-6 justify-center items-center"
        onSubmit={submit}
      >
        <input
          required
          className="create-input focus:border-opacity-10 w-full  rounded-lg md:border-4 border-2 border-yellow py-2 px-4 text-darkGrey font-bold text-xl placeholder-anothershadeofgrey"
          placeholder="Location"
          type="text"
          name="location"
          value={location}
          onChange={change}
        />

        <input
          className="create-input focus:border-opacity-10 w-full  rounded-lg md:border-4 border-2 border-yellow py-2 px-4 text-darkGrey font-bold text-xl placeholder-anothershadeofgrey"
          required
          placeholder="date"
          type="date"
          name="date"
          value={date}
          onChange={change}
        />
        <input
          className="create-input focus:border-opacity-10 w-full  rounded-lg md:border-4 border-2 border-yellow py-2 px-4 text-darkGrey font-bold text-xl placeholder-anothershadeofgrey"
          placeholder="Sport"
          type="text"
          required
          name="sport"
          value={sport}
          onChange={change}
        />
        <input
          className="create-input focus:border-opacity-10 w-full  rounded-lg md:border-4 border-2 border-yellow py-2 px-4 text-darkGrey font-bold text-xl placeholder-anothershadeofgrey"
          placeholder="How many more people do you need?"
          type="number"
          min="1"
          name="slotsLeft"
          required
          value={slotsLeft}
          onChange={change}
        />
        <input
          className="create-input focus:border-opacity-10 w-full  rounded-lg md:border-4 border-2 border-yellow py-2 px-4 text-darkGrey font-bold text-xl placeholder-anothershadeofgrey"
          placeholder="Remarks"
          type="text"
          required
          min="1"
          name="remarks"
          value={remarks}
          onChange={change}
        />
        <input
          type="submit"
          value="Create!"
          className="font-bold text-xl md:text-3xl py-2 px-4 rounded-full bg-yellow text-white"
        />
      </form>
    </>
  );
};

export default CreateListing;
