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

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header className="font-bold text-sm bg-[#f7da34] text-md p-8 flex justify-between sm:justify-between items-center sticky w-full mx-auto">
        <Link to="/home">
          <h1 className="text-2xl font-bold">{"<Pokéhack />"}</h1>
        </Link>
        <div className="hidden sm:flex">
          {user && (
            <div className="flex items-center font-semibold gap-4">
              <Link
                to="/create-post"
                className="flex justify-center items-center px-4 py-2 capitalize text-sm font-bold text-white rounded-3xl bg-red-500 hover:bg-red-600"
              >
                Create
              </Link>
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
        </div>
        {/* mobile button goes here */}
        <div className="flex sm:hidden items-center">
          <button className="mobile-menu-button" onClick={handleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-12 h-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        {/* mobile menu goes here */}
      </header>
      <div className={showMenu ? "" : "hidden"}>
        <Link
          to="/"
          className="block p-4 text-2xl bg-red-500 text-white hover:bg-red-600"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          Home
        </Link>
        <Link
          to="create-post"
          className="block p-4 text-2xl bg-red-500 text-white hover:bg-red-600"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          Create
        </Link>
        <Link
          to="/ai"
          className="block p-4 text-2xl bg-red-500 text-white hover:bg-red-600"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          Community
        </Link>

        <button
          onClick={handleClick}
          className="block w-full text-left p-4 text-2xl bg-red-500 text-white hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Navbar;
