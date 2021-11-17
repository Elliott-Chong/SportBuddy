import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="mb-10 flex md:justify-between py-3 relative pl-10 font-custom">
      <Link
        className="font-custom font-bold text-siena text-5xl items-center my-auto"
        to="/"
      >
        Sport Buddy
      </Link>
      <div className=" md:flex justify-between text-darkGrey text-3xl space-x-7 hidden items-center">
        <Link className="my-0 font-bold custom-underline" to="/about">
          about
        </Link>
        <Link
          className="my-0 font-bold bg-yellow px-4 custom-underline py-2 rounded-full"
          to="/auth"
        >
          login/signup
        </Link>
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
