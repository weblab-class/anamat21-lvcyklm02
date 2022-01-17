import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title NavBar-title-icon">PodMates</div>
      <div className="NavBar-linkContainer">
        <Link to="/" className="NavBar-link">
          Join
        </Link>
        {props.userId && (
          <Link to={`/status/${props.userId}`} className="NavBar-link NavBar-status-icon">
            Status
          </Link>
        )}
        {props.userId && (
          <Link to={`/chores/${props.userId}`} className="NavBar-link NavBar-chores-icon">
            Chores
          </Link>
        )}
        {props.userId && (
          <Link
            to={`/announcements/${props.userId}`}
            className="NavBar-link NavBar-announcements-icon"
          >
            Announcements
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
