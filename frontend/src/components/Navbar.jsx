import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);

  // header state
  const [isActive, setIsActive] = useState(false);

  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSmallerDevice(window.innerWidth <= 1014);
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Check if the current location path is "/login"
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/";

  if (isLoginPage) {
    return null; // Return null to hide the navbar on the login page
  }

  return (
    <div>
      <header
        className={`flex justify-center lg:justify-between items-center p-12 fixed top-0 w-full z-10 transition-all ${
          isActive
            ? "bg-black py-4 shadow-md text-white"
            : "bg-[#F7D02C] py-6 text-black"
        }`}
      >
        {!isSmallerDevice && (
          <Link to="/home">
            <h1 className="text-2xl font-bold">{"<Pokéhack />"}</h1>
          </Link>
        )}
        <div>
          <div className="flex max-w-lg mx-auto items-center font-semibold gap-4 justify-center sm:justify-between">
            <Link
              to="/create"
              className="flex justify-center items-center px-4 py-2 capitalize text-sm font-bold text-white rounded-3xl bg-red-500 hover:bg-red-600"
            >
              Create
            </Link>
            <Link className="text-sm font-bold" to="/community">
              Community
            </Link>

            {!user && (
              <>
                <span className="text-sm font-bold">Hello, Guest</span>
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
                <button className="text-sm font-bold" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
