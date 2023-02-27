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
      <Link to="users" className={styles.link}>
        All Users
      </Link>
      <Link to="custom" className={styles.link}>
        Custom Pokemon
      </Link>
      <Link to="cards" className={styles.link}>
        Cards
      </Link>
    </nav>
  );
};

export default Navbar;
