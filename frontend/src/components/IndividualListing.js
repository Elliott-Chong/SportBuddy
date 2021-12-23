import React from "react";
import { Link } from "react-router-dom";

const IndividualListing = ({ sport, location, slotsLeft, id }) => {
  return (
    <div
      className="md:bg-white p-4 md:px-11 py-6 flex justify-around flex-col bg-cardGrey bg-opacity-5 font-custom"
      style={{
        borderRadius: "50px",
      }}
    >
      <div className="info flex flex-col text-white font-semibold text-xl justify-center items-center space-y-5 text-center font-custom">
        <p className="font-semibold text-center text-3xl text-cardGrey">
          {sport}
        </p>
        <p className="font-medium text-anothershadeofgrey text-center text-xl font-custom">
          {location.split("\n")[0]}
        </p>

        <Link
          to={`/listing/${id}`}
          className=" bg-yellow py-2 px-2 rounded-full  font-custom"
        >
          <p className="inline-block text-center font-custom text-darkGrey font-semibold md:text-xl text-lg px-4">
            {slotsLeft} more {`${slotsLeft === 1 ? "person" : "people"}`} wanted
          </p>
        </Link>
      </div>
    </div>
  );
};

export default IndividualListing;
