import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="font-bold text-sm bg-[#f7da34] text-md px-16 py-8 flex justify-between items-center sticky w-full mx-auto">
      <Link to="/">
        <h1 className="font-bold text-3xl">Pokéhack</h1>
      </Link>
      <nav>
        {user && (
          <div className="flex justify-evenly items-center gap-7 font-light text-md">
            <Link to="/mypokemon">My Pokemon</Link>
            <Link to="/create-post">Create</Link>
            <Link to="/ai">Community</Link>
            <span>Hello, {user.email}</span>
            <button onClick={handleClick}>Log Out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
