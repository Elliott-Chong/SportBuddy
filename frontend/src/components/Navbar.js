import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const hamRef = React.useRef();
  const sidebarRef = React.useRef();
  const [ham, setHam] = React.useState(true);
  const back = () => {
    if (ham) return;
    setTimeout(() => hamRef.current.classList.toggle("active"), 300);
    hamRef.current.classList.toggle("rotate");
    sidebarRef.current.classList.toggle("active");
    document.querySelector("body").classList.toggle("active");
    setHam(!ham);
  };
  const toggleHam = () => {
    if (ham) {
      hamRef.current.classList.toggle("active");
      setTimeout(() => hamRef.current.classList.toggle("rotate"), 300);
    } else {
      setTimeout(() => hamRef.current.classList.toggle("active"), 300);
      hamRef.current.classList.toggle("rotate");
    }
    setHam(!ham);
    sidebarRef.current.classList.toggle("active");
    document.querySelector("body").classList.toggle("active");
  };
  const {
    logout,
    fetchListings,
    dispatch,
    state: { user },
  } = useGlobalContext();
  return (
    <>
      <nav className="my-10 mx-5 flex px-10 z-20 absolute py-1  w-full   font-custom">
        <Link
          onClick={() => {
            fetchListings();
            dispatch({ type: "CLEAR_SEARCH" });
            back();
          }}
          className="font-custom font-bold text-siena text-5xl items-center my-auto"
          to="/"
        >
          Sport Buddy
        </Link>
        <div className=" md:flex ml-auto justify-between text-darkGrey text-3xl space-x-7 hidden items-center">
          {user && (
            <>
              <button
                className="my-0 font-bold custom-underline"
                onClick={logout}
              >
                Logout
              </button>
              <Link to="/create" className="my-0 font-bold custom-underline">
                Create Listing
              </Link>
            </>
          )}
          <Link
            className="my-0 font-bold bg-yellow px-6  py-4 rounded-[15px]"
            to="/login"
          >
            Login/Sign up
          </Link>
        </div>
        <button
          id="ham-wrapper"
          ref={hamRef}
          onClick={toggleHam}
          className="md:hidden m-10"
        >
          <div className="ham"></div>
        </button>
      </nav>

      <section
        id="sidebar"
        ref={sidebarRef}
        className="absolute top-0 overflow-hidden z-10 left-0 flex text-3xl font-bold text-siena space-y-6 transform -translate-x-full justify-center items-center flex-col h-screen w-full bg-white"
      >
        <Link
          onClick={back}
          to="/login"
          className="bg-siena text-white  py-2 px-4 rounded-full text-3xl"
        >
          Login/Sign Up
        </Link>
        <Link
          to="/"
          onClick={back}
          className="bg-siena text-white py-2 px-4 rounded-full text-3xl"
        >
          Home
        </Link>
        {user && (
          <>
            <Link
              to="/"
              className="bg-siena text-white py-2 px-4 rounded-full text-3xl"
              onClick={() => {
                logout();
                back();
              }}
            >
              Logout
            </Link>
            <Link
              to="/create"
              className="bg-siena text-white py-2 px-4 rounded-full text-3xl"
              onClick={() => {
                back();
              }}
            >
              Create Listing
            </Link>
          </>
        )}
      </section>
    </>
  );
};

export default Navbar;
