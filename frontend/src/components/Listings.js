import React from "react";
import Search from "./Search";
import IndividualListing from "./IndividualListing";
import { useGlobalContext } from "../context";

const Listings = () => {
  const {
    fetchListings,
    state: { listings, loading },
  } = useGlobalContext();
  React.useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return (
    <section
      className="md:bg-grey md:px-20 md:py-12 flex flex-col items-center "
      style={{ borderRadius: "15px" }}
    >
      <Search />
      {loading ? (
        <h1 className="text-5xl text-siena font-bold text-center">
          Loading...
        </h1>
      ) : (
        <>
          <section
            className={`grid ${
              listings &&
              listings.length > 0 &&
              "grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3"
            }  w-full justify-items-stretch gap-x-20 gap-y-10 `}
          >
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
              <h1 className="font-bold text-darkGrey md:text-3xl text-2xl text-center">
                No listings found
              </h1>
            )}
          </section>
        </>
      )}
    </section>
  );
};

export default Listings;
