import React from "react";
import pfp from "../pfp.jpeg";

const IndividualListing = () => {
  return (
    <div
      className="bg-cardGrey p-10 flex"
      style={{
        borderRadius: "30px",
      }}
    >
      <img src={pfp} alt="pfp" className="h-12 rounded-full object-cover" />
    </div>
  );
};

export default IndividualListing;
