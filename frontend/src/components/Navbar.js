import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { handleLogout } = useLogout();
  const { user } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    handleLogout();
    setShowMenu(false);
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup" ||
    window.location.pathname === "/"
  ) {
    return null;
  } else {
    return (
      <>
        <header className="font-bold text-sm bg-[#f7da34] text-md p-8 flex justify-between sm:justify-between items-center sticky w-full mx-auto">
          <Link to="/home">
            <h1 className="text-2xl font-bold">{"<Pokéhack />"}</h1>
          </Link>
          <div className="hidden sm:flex">
            <div className="flex items-center font-semibold gap-4">
              <Link
                to="/create-post"
                className="flex justify-center items-center px-4 py-2 capitalize text-sm font-bold text-white rounded-3xl bg-red-500 hover:bg-red-600"
              >
                Create
              </Link>
              <Link className="text-sm font-bold" to="/ai">
                Community
              </Link>

              {!user && (
                <>
                  <span className="hidden sm:block text-sm font-bold">
                    Hello, Guest
                  </span>
                  <Link className="text-sm font-bold" to="/login">
                    Login
                  </Link>
                </>
              )}

              {user && (
                <>
                  <span className="hidden sm:block text-sm font-bold">
                    Hello, {user.email.slice(0, user.email.indexOf("@"))}
                  </span>
                  <button className="text-sm font-bold" onClick={handleClick}>
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>
          {/* mobile button goes here */}
          <div className="flex sm:hidden items-center">
            <button className="mobile-menu-button" onClick={handleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          {/* mobile menu goes here */}
        </header>
        <div className={showMenu ? "" : "hidden"}>
          <Link
            to="/home"
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
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </>
    );
  }
};

export default Navbar;
