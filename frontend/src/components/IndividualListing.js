import React from "react";
import pfp from "../pfp.jpeg";
import { MdAccountCircle } from "react-icons/md";

const IndividualListing = () => {
  return (
    <div
      className="md:bg-white p-4 md:px-11 py-6 flex justify-around flex-col bg-cardGrey bg-opacity-5 font-custom"
      style={{
        borderRadius: "50px",
      }}
    >
      <div className="info flex flex-col text-white font-semibold text-xl space-y-5 text-center font-custom">
        <p className="font-semibold text-center text-3xl text-cardGrey">
          Soccer
        </p>
        <p className="font-medium text-anothershadeofgrey text-center text-xl font-custom">
          CHIJ St. Joseph's Convent School Hall
        </p>

        <button className=" bg-yellow py-2  rounded-full inline-block font-custom">
          <p className="inline-block text-center font-custom text-darkGrey font-semibold md:text-xl text-lg px-4">
            {5} more people wanted
          </p>
        </button>
      </div>
    </div>
  );
};

export default IndividualListing;
