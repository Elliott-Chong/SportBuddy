import React from "react";
import Search from "./Search";
import IndividualListing from "./IndividualListing";
import { useGlobalContext } from "../context";

const Listings = () => {
  const {
    fetchListings,
    state: { listings },
  } = useGlobalContext();
  React.useEffect(() => {
    fetchListings();
  }, [fetchListings]);
  return (
    <section
      className="md:bg-grey md:px-20 md:py-12 flex flex-col items-center "
      style={{ borderRadius: "50px" }}
    >
      <Search />
      <section className="grid md:grid-cols-2  grid-cols-1 w-full justify-items-stretch gap-x-20 gap-y-10 lg:grid-cols-3">
        {listings && listings.length > 0 ? (
          listings.map((listing) => {
            return (
              <IndividualListing
                key={listing._id}
                sport={listing.sport}
                location={listing.location}
                id={listing._id}
                peopleJoinedLength={listing.peopleJoined.length}
                slotsLeft={listing.amountOfPeopleNeeded}
              />
            );
          })
        ) : (
          <h1 className="font-bold md:text-2xl text-xl text-center">
            No listings for now... Check back later!
          </h1>
        )}
      </section>
    </section>
  );
};

export default Listings;
