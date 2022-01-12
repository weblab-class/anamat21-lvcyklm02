import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Status.css";

const Status = (props) => {
  return (
    // building image
    <>
      <div className="Status-container">
        <div className="Status-profile-container Status-subcontainer">
          <div className="Status-subcontainer">
            <h3>A picture goes here</h3>
          </div>
          <div className="Status-subcontainer">
            <h1 className="Status-title">Hello Ana!</h1>
            <h3>
              Your task for today is <u>Dishes</u>. Have you done it yet?
            </h3>
          </div>
        </div>
        <div className="Status-subcontainer Status-points-container">
          <h2 className="Status-title">Ihouse points: 4</h2>
          <h2 className="Status-title">Ana points: 3</h2>
        </div>
      </div>
    </>
  );
};

export default Status;
