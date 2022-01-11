import React from "react";
import Moment from "react-moment";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import avatar from "../images/avatar-round.png";
import Spinner from "../images/loading.gif";
const SingleListing = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const {
    joinRoom,
    state: { listing, user },
    fetchSingleListing,
    deleteListing,
  } = useGlobalContext();
  React.useEffect(() => {
    fetchSingleListing(id);
  }, [fetchSingleListing, id]);
  if (!listing) return <img src={Spinner} alt="spinner gif" />;
  const hasJoined = listing.peopleJoined.find(
    (person) => person._id === user._id
  );

  return (
    <>
      <div
        id="info"
        className="bg-gray-300 text-center rounded-3xl space-y-6 md:space-y-12  py-6 px-8 md:py-10 md:px-16 flex flex-col justify-start items-center"
        style={{ borderRadius: "15px" }}
      >
        <p className="font-bold flex flex-col md:inline justify-center items-center space-y-2 text-xl md:text-3xl text-darkGrey">
          <span className="text-black">Location:</span>{" "}
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-[15px]">
            {listing.location.split("\n")[0]}
          </span>
        </p>
        <p className="font-bold flex flex-col md:inline justify-center items-center space-y-2 text-xl md:text-3xl text-darkGrey">
          <span className="text-black">Address:</span>{" "}
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-[15px]">
            {listing.location.split("\n")[2]}
          </span>
        </p>
        <p className="font-bold flex flex-col md:inline text-xl md:text-3xl text-darkGrey justify-center items-center space-y-2">
          <span className="text-black">Date:</span>{" "}
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-[15px]">
            <Moment format="YYYY/MM/DD">{listing.dateOfMeet}</Moment>
          </span>
        </p>
        <p className="font-bold flex flex-col md:inline text-xl md:text-3xl text-darkGrey justify-center items-center space-y-2">
          <span className="text-black">Sport:</span>
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-[15px]">
            {listing.sport}
          </span>
        </p>
        <p className="font-bold flex flex-col md:inline text-xl md:text-3xl text-darkGrey justify-center items-center space-y-2">
          <span className="text-black">Slots Left:</span>
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-[15px]">
            {listing.amountOfPeopleNeeded - listing.peopleJoined.length + 1}
          </span>
        </p>
        {listing && listing.remarks && (
          <p className="font-bold flex flex-col md:inline text-xl md:text-3xl text-darkGrey justify-center items-center space-y-2">
            <span className="text-black">Remarks:</span>
            <span className="bg-yellow md:ml-3 py-2 px-4 rounded-[15px]">
              {listing.remarks}
            </span>
          </p>
        )}
        <div className="md:flex md:justify-center md:items-center md:space-x-5 md:space-y-0 space-y-5">
          <Link
            to={`/chat/${id}`}
            className={`bg-siena py-2 px-4 shadow-lg rounded-xl font-bold text-xl text-white hover:bg-yellow hover:text-siena transition-all duration-300`}
          >
            Chat Room
          </Link>
          {listing.user._id === user._id && (
            <button
              onClick={() => deleteListing(id, history)}
              className={`delete bg-siena py-2 px-4 shadow-lg rounded-xl font-bold text-xl text-white hover:bg-yellow hover:text-siena transition-all duration-300`}
            >
              Delete Listing
            </button>
          )}
        </div>
      </div>
      <div
        className="bg-gray-300 mt-10 text-siena rounded-3xl space-y-6 md:space-y-12  py-6 px-8 md:py-10 md:px-16 flex flex-col justify-start items-center"
        id="people"
        style={{ borderRadius: "15px" }}
      >
        <div className="flex items-center justify-center space-x-4">
          <h1 className="md:text-4xl text-2xl font-bold">People Joined</h1>
          <span>
            <button
              onClick={() => joinRoom(id)}
              className={`bg-siena py-2 px-4 rounded-xl font-bold shadow-lg text-xl text-white hover:bg-yellow hover:text-siena transition-all duration-300`}
            >
              {`${hasJoined ? "Joined" : "Join"}`}
            </button>
          </span>
        </div>

        <div className="md:flex md:flex-row md:space-x-10 md:space-y-0 space-y-10 flex flex-col">
          {listing && listing.peopleJoined.length > 0 ? (
            listing.peopleJoined.map((person) => {
              return (
                <div
                  key={person._id}
                  className="flex flex-col items-center justify-center space-y-3"
                >
                  <img
                    src={person.avatar || avatar}
                    alt="avatar img"
                    className="w-28 h-28 rounded-[15px]"
                  />
                  <div className="md:relative md:block flex justify-center items-center md:space-x-0 space-x-2">
                    <p className="font-bold text-2xl">{person.username}</p>
                    {person._id === listing.user._id && (
                      <p className="font-bold text-darkGrey md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-sm">
                        (host)
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="font-bold text-xl text-black">
              No one has participated yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleListing;
