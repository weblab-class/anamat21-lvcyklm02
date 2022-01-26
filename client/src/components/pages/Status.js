import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Status.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import { Redirect } from "@reach/router";

import Input from "../modules/Input.js";
import ProfilePic from "../modules/ProfilePic.js";

/**
 * Status page
 *
 * Proptypes
 * param {string} userId is the user id from login in
 */

const Status = (props) => {
  const [user, setUser] = useState();
  const [group, setGroup] = useState();
  const [chores, setChores] = useState([]);

  useEffect(() => {
    get("/api/user/group", { userid: props.userId }).then((Obj) => {
      setUser(Obj.user_);
      setGroup(Obj.group_);
    });
    get("/api/assignment/byuser", { userid: props.userId }).then((all) => {
      for (let step = 0; step < all.length; step++) {
        setChores(...chores, all[step].content);
      }
    });
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }

  if (!group) {
    return <div> Please join a group to see your status! </div>;
  }

  const changeStatus = () => {
    console.log("TO-DO: Change chore status");
  };
  return (
    // building image
    //<ProfilePic user={user} />
    <>
      <div className="Status-container">
        <div className="Status-profile-container Status-subcontainer">
          <div id="profimg" className="Status-subcontainer Status-single "></div>
          <div className="Status-subcontainer Status-single ">
            <h1 className="Status-title">Hello {user.name}!</h1>
            <h3>
              Your assigned chores are: <u>{chores}</u>. Have you done it yet?
            </h3>
            <button onClick={changeStatus}>Yes</button>
            <h3>Your current group is: {group.name}</h3>
            <p>Does a friend need to join? Your group id is: {group._id}</p>
          </div>
        </div>
        <div className="Status-subcontainer">
          <div className="Status-points-container Status-single ">
            <h2>
              {group.name} points: {group.points}
            </h2>
          </div>
          <div className="Status-points-container Status-single ">
            <h2>
              {user.name}'s points: {user.points}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;
