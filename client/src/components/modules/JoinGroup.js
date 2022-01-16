import React, { useState, useEffect } from "react";

import "../../utilities.css";
//import "./JoinGroup.css";

import Input from "./Input.js";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import { Redirect } from "@reach/router";

/**
 * Status page
 *
 * Proptypes
 * param {string} groupId
 */

const JoinGroup = (props) => {
  useEffect(() => {
    get("/api/group", { groupid: props.groupId }).then((groupObj) => {
      get(`/api/user`, { userid: props.userId }).then((userObj) => {
        userObj.groupid = groupObj;
      });
    });
  });

  return <Redirect to="/status/" />;
};

const MakeNewGroup = (props) => {
  console.log("hello");
  const newgroup = {
    name: props.name,
    members: [props.userid],
    chores: [],
    points: 0,
  };
  post("/api/groups", newgroup).then(() => {
    console.log("it logged!");
  });

  return <Redirect to="/status/" />;
};

export { JoinGroup, MakeNewGroup };
