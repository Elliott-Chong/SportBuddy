import React from "react";
import Search from "./Search";
import IndividualListing from "./IndividualListing";

const Listings = () => {
  return (
    <section
      className="bg-grey px-20 py-12 flex flex-col items-center"
      style={{ borderRadius: "50px" }}
    >
      <Search />
      <section className="grid md:grid-cols-2 grid-cols-1 w-full justify-items-stretch gap-x-20 gap-y-10 lg:grid-cols-3">
        <IndividualListing />
        <IndividualListing />
        <IndividualListing />
        <IndividualListing />
      </section>
    </section>
  );
};

export default Listings;
