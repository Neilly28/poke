import React from "react";
import { Link } from "react-router-dom";
// import styles from "./Navbar.module.css"; // import the CSS Modules styles

const Navbar = () => {
  return (
    <nav className="text-[#ffcb05] bg-[#3160a3] text-2xl p-4 mt-10 flex justify-evenly items-center h-24 mx-auto sticky">
      <Link to="/" className="text3xl">
        Home
      </Link>
      <Link to="profile">My Profile</Link>
      <Link to="collection">My Collection</Link>
      <Link to="users">All Users</Link>
      <Link to="custom">Custom Pokemon</Link>
      <Link to="cards">Cards</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Navbar;
