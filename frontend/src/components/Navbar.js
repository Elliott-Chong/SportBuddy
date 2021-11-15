import React from "react";

const Navbar = () => {
  return (
    <nav className="mb-10 flex justify-between py-3 ">
      <h1 className="font-poppins font-bold text-siena text-5xl">
        Sport Buddy
      </h1>
      <div className=" flex justify-between text-darkGrey text-3xl space-x-7">
        <button className="my-0 font-bold">about</button>
        <button className="my-0 font-bold bg-yellow px-4 py-2 rounded-full">
          login/signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
