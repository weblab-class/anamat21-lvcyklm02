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
          Status
        </Link>
        <Link to="/skeleton/" className="NavBar-link">
          Skeleton
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
