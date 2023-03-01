import React from "react";
import { Link } from "react-router-dom";
// import styles from "./Navbar.module.css"; // import the CSS Modules styles
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    console.log("LOGOUT WAS CLICKED!!");
  };

  return (
    <nav className="text-[#444] font-bold text-sm bg-[#f7da34] text-2xl p-4 mt-10 flex justify-evenly items-center h-24 mx-auto sticky">
      <Link to="/" className="text3xl">
        Home
      </Link>
      {/* <Link to="profile">My Profile</Link> */}
      <Link to="collection">My Collection</Link>
      <Link to="users">All Users</Link>
      <Link to="custom">Custom Pokemon</Link>
      <Link to="random">Random Pokemon</Link>

      {/* <Link to="cards">Cards</Link> */}
      {!user && (
        <div className="logsign">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}

      {user && (
        <div className="logout">
          <span> {user.email} </span>
          <button onClick={handleClick}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
