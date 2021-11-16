import React from "react";

const Navbar = () => {
  return (
    <nav className="mb-10 flex md:justify-between py-3 relative pl-10">
      <h1 className="font-poppins font-bold text-siena text-5xl items-center my-auto">
        Sport Buddy
      </h1>
      <div className=" md:flex justify-between text-darkGrey text-3xl space-x-7 hidden items-center">
        <button className="my-0 font-bold">about</button>
        <button className="my-0 font-bold bg-yellow px-4 py-2 rounded-full">
          login/signup
        </button>
      </div>
      <button className="md:hidden m-10">
        <div className="ham"></div>
        <div className="ham"></div>
        <div className="ham"></div>
      </button>
    </nav>
  );
};

export default Navbar;
