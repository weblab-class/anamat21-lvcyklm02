import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Status.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import { ensureNotLoggedIn } from "connect-ensure-login/lib";

const Status = (props) => {
  //   const [user, setUser] = useState(undefined);

  //   useEffect(() => {
  //     get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  //   }, []);

  //   if (!user) {
  //     return <div> Loading! </div>;
  //   }

  const user = { name: "Ana Mata" };

  return (
    // building image
    <>
      <div className="Status-container">
        <div className="Status-profile-container Status-subcontainer">
          <div className="Status-subcontainer">
            <h3>A picture goes here</h3>
          </div>
          <div className="Status-subcontainer">
            <h1 className="Status-title">Hello {user.name}!</h1>
            <h3>
              Your task for today is <u>Dishes</u>. Have you done it yet?
            </h3>
          </div>
        </div>
        <div className="Status-subcontainer">
          <h2 className="Status-title Status-points-container">Ihouse points: 4</h2>
          <h2 className="Status-title Status-points-container">{user.name}'s points: 3</h2>
        </div>
      </div>
    </>
  );
};

export default Status;
