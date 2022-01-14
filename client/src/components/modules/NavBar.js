import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title">PodMates</div>
      <div className="NavBar-linkContainer">
        <Link to="/" className="NavBar-link">
          Skeleton
        </Link>
        <Link to="/status/" className="NavBar-link">
          Status
        </Link>
        <Link to="/chores/" className="NavBar-link">
          Chores
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
