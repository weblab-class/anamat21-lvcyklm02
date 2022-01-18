import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Status.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import { Redirect } from "@reach/router";

import Input from "../modules/Input.js";

/**
 * Status page
 *
 * Proptypes
 * param {string} userId is the user id from login in
 */

const Status = (props) => {
  const [user, setUser] = useState();
  const [group, setGroup] = useState();

  useEffect(() => {
    get("/api/user/group", { userid: props.userId }).then((Obj) => {
      setUser(Obj.user_);
      setGroup(Obj.group_);
    });
  }, []);

  console.log(user);

  if (!user) {
    return <div> Loading! </div>;
  }

  if (!group) {
    return <div> Please join a group to see your status! </div>;
  }

  return (
    // building image
    <>
      <div className="Status-container">
        <div className="Status-profile-container Status-subcontainer">
          <div className="Status-subcontainer">
            <p>Img goes here</p>
          </div>
          <div className="Status-subcontainer">
            <h1 className="Status-title">Hello {user.name}!</h1>
            <h3>
              Your task for today is <u>Dishes</u>. Have you done it yet?
            </h3>
          </div>
        </div>
        <div className="Status-subcontainer">
          <h2 className="Status-title Status-points-container">{group.name} points: 4</h2>
          <h2 className="Status-title Status-points-container">{user.name}'s points: 3</h2>
        </div>
      </div>
    </>
  );
};

export default Status;
