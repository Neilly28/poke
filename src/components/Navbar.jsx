import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; // import the CSS Modules styles

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <Link to="profile" className={styles.link}>
        My Profile
      </Link>
      <Link to="collection" className={styles.link}>
        My Collection
      </Link>
    </nav>
  );
};

export default Navbar;
