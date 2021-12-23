import React from "react";
import Moment from "react-moment";
import avatar from "../images/avatar-round.png";
const SingleListing = ({
  match: {
    params: { id },
  },
}) => {
  return (
    <>
      <div
        id="info"
        className="bg-gray-300 text-center rounded-3xl space-y-6 md:space-y-12 md:rounded-full py-6 px-8 md:py-10 md:px-16 flex flex-col justify-start items-center"
      >
        <p className="font-bold flex flex-col md:inline justify-center items-center space-y-2 text-xl md:text-3xl text-darkGrey">
          <span className="text-black">Location:</span>{" "}
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-full">
            Corporation Primary School Hall
          </span>
        </p>
        <p className="font-bold flex flex-col md:inline text-xl md:text-3xl text-darkGrey justify-center items-center space-y-2">
          <span className="text-black">Date:</span>{" "}
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-full">
            <Moment format="YYYY/MM/DD">2021-5-2</Moment>
          </span>
        </p>
        <p className="font-bold flex flex-col md:inline text-xl md:text-3xl text-darkGrey justify-center items-center space-y-2">
          <span className="text-black">Sport:</span>
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-full">
            Badminton
          </span>
        </p>
        <p className="font-bold flex flex-col md:inline text-xl md:text-3xl text-darkGrey justify-center items-center space-y-2">
          <span className="text-black">Slots Left:</span>
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-full">5</span>
        </p>
        <p className="font-bold flex flex-col md:inline text-xl md:text-3xl text-darkGrey justify-center items-center space-y-2">
          <span className="text-black">Remarks:</span>
          <span className="bg-yellow md:ml-3 py-2 px-4 rounded-full">
            Please bring your own badminton raquets
          </span>
        </p>
      </div>
      <div
        className="bg-gray-300 mt-10 text-siena rounded-3xl space-y-6 md:space-y-12 md:rounded-full py-6 px-8 md:py-10 md:px-16 flex flex-col justify-start items-center"
        id="people"
      >
        <h1 className="md:text-4xl text-2xl font-bold">People Joined</h1>

        <div className="md:flex md:flex-row md:space-x-10 space-y-6 flex flex-col">
          <div className="flex flex-col items-center justify-center space-y-3">
            <img src={avatar} alt="avatar img" className="w-28 h-28" />
            <p className="font-bold text-2xl">Elliott</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3">
            <img src={avatar} alt="avatar img" className="w-28 h-28" />
            <p className="font-bold text-2xl">Jerome</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3">
            <img src={avatar} alt="avatar img" className="w-28 h-28" />
            <p className="font-bold text-2xl">Glen</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3">
            <img src={avatar} alt="avatar img" className="w-28 h-28" />
            <p className="font-bold text-2xl">Jorell</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3">
            <img src={avatar} alt="avatar img" className="w-28 h-28" />
            <p className="font-bold text-2xl">Andy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleListing;
