import React, { useState, useEffect, Component } from "react";

import "../../utilities.css";
import ChoreSchedule from "../modules/ChoreSchedule";
import ChoreList from "../modules/ChoreList";
import "./Chores.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

const Chores = (props) => {
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
    <div className="box">
      <div className="item container-chores-schedule">
        <ChoreSchedule />
      </div>

      <div className="item container-chores-panel">
        <div className="item container-chores-list">
          <ChoreList group={group} />
        </div>
        <div className="item container-chores-refresh">
          <p>5 days till refresh</p>
          <button>Manually refresh now</button>
        </div>
      </div>
    </div>
  );
};

export default Chores;
