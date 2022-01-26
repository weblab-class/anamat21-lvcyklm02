import React, { useState, useEffect } from "react";

import "../../utilities.css";
//import "./JoinGroup.css";

import Input from "./Input.js";
import Status from "../pages/Status.js";

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
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  console.log(user);

  if (!user) {
    return <div> Loading! </div>;
  }

  const onSubmitJoin = (text) => {
    console.log(text);
    post("/api/group/add", { groupid: text }).then((newGroupObj) => {
      if (newGroupObj.group === null) {
        alert("This group does not exist!");
      } else {
        setClicked(true);
      }
    });
  };

  const onSubmitNew = (text) => {
    console.log(text);

    console.log("hello");
    const newgroup = {
      name: text,
      members: [props.userId],
      chores: [],
      points: 0,
    };
    post("/api/group", newgroup).then((newGroupObj) => {
      setClicked(true);
    });
  };

  return (
    <>
      <h3>And if you haven't joined a living community group, do one of the following:</h3>
      <div className="Home-div">
        <h3>Make a new PodMates living community:</h3>
        <div className="Home-subcontainer">
          <Input defaultText={"New group name"} type={"text"} onSubmit={onSubmitNew} />
        </div>
      </div>
      <div className="Home-div">
        <h3>Join an existing living community:</h3>
        <div className="Home-subcontainer">
          <Input defaultText={"Enter group id"} type={"text"} onSubmit={onSubmitJoin} />
        </div>
      </div>
      {clicked ? <Redirect to={`/status/${props.userId}`} /> : <div></div>}
    </>
  );
};

export default JoinGroup;
