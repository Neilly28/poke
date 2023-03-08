import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    logout();
  };

  return (
    <header className="font-bold text-sm bg-[#f7da34] text-md p-4 flex justify-between sm:justify-around items-center sticky w-full mx-auto">
      <Link to="/home">
        <h1 className="font-bold text-3xl">Pokéhack</h1>
      </Link>
      <div>
        <button
          className="block md:hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M2.01 21L23 21 23 19 2.01 19zM2.01 14L23 14 23 12 2.01 12zM23 5L2.01 5 2.01 3 23 3z" />
          </svg>
        </button>

        <nav
          className={`absolute md:static md:flex md:justify-evenly md:items-center w-full text-black transition-transform transform-gpu duration-300 ease-in-out`}
          style={{ top: "100px", left: "0" }}
        >
          {user && (
            <div className="flex flex-col md:flex-row md:gap-7 items-center font-semibold sm:text-md gap-8 sm:gap-4 p-4 bg-red-500 text-white text-2xl sm:text-sm sm:text-black sm:bg-[#f7da34]">
              <Link to="/create-post">Create</Link>
              <Link to="/ai">Community</Link>
              <span className="hidden sm:block">
                Hello, {user.email.slice(0, user.email.indexOf("@"))}
              </span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div className="flex flex-col gap-4 md:flex-row md:gap-7 items-center font-light text-md">
              <Link to="/login">Login</Link>
              {/* <Link to="/signup">Signup</Link> */}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
