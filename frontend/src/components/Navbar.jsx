import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <Link to="/">
        <h1>Pokehack Nav</h1>
      </Link>
    </header>
  );
};

export default Navbar;
