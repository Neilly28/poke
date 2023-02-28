import React from "react";
import { Link } from "react-router-dom";
// import styles from "./Navbar.module.css"; // import the CSS Modules styles

const Navbar = () => {
  return (
    <nav className="text-[#FF9494] bg-[#FFE3E1] p-4 flex justify-evenly text-lg">
      <Link to="/" className="text3xl">
        Home
      </Link>
      <Link to="profile">My Profile</Link>
      <Link to="collection">My Collection</Link>
      <Link to="users">All Users</Link>
      <Link to="custom">Custom Pokemon</Link>
      <Link to="cards">Cards</Link>
    </nav>
  );
};

export default Navbar;
