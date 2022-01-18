import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./ChoresSchedule.css";

import AssignChores from "./AssignChores.js";

import { get, post } from "../../utilities";

const ChoreSchedule = (props) => {
  const [choreList, setChoreList] = useState([]);
  const [userList, setUserList] = useState([]);

  //load chore and users list from api
  useEffect(() => {
    get("/api/chore", { groupid: props.group._id }).then((chores) => {
      setChoreList(chores);
      setUserList(props.group.members);
    });
  }, [choreList, userList]);

  let mondays = [];
  let tuesdays = [];
  let wednesdays = [];
  let thursdays = [];
  let fridays = [];
  let saturdays = [];
  let sundays = [];

  for (let i = 0; i < choreList.length; i++) {
    if (choreList[i].currentlyAssigned === undefined) {
      break;
    }

    let chore_name = choreList[i].content;
    let chore_users = choreList[i].currentlyAssigned.users;
    let chore_days = choreList[i].currentlyAssigned.days;

    if (chore_days.includes("M")) {
      mondays.push(
        <p className="ChoreSchedule-ids">
          {chore_name}: {chore_users}
        </p>
      );
    }

    if (chore_days.includes("Tu")) {
      tuesdays.push(
        <p className="ChoreSchedule-ids">
          {chore_name}: {chore_users}
        </p>
      );
    }
    if (chore_days.includes("W")) {
      wednesdays.push(
        <p className="ChoreSchedule-ids">
          {chore_name}: {chore_users}
        </p>
      );
    }
    if (chore_days.includes("Th")) {
      thursdays.push(
        <p className="ChoreSchedule-ids">
          {chore_name}: {chore_users}
        </p>
      );
    }
    if (chore_days.includes("F")) {
      fridays.push(
        <p className="ChoreSchedule-ids">
          {chore_name}: {chore_users}
        </p>
      );
    }
    if (chore_days.includes("Sa")) {
      saturdays.push(
        <p className="ChoreSchedule-ids">
          {chore_name}: {chore_users}
        </p>
      );
    }
    if (chore_days.includes("Su")) {
      sundays.push(
        <p className="ChoreSchedule-ids">
          {chore_name}: {chore_users}
        </p>
      );
    }
  }

  return (
    <>
      <h1>Chores Schedule This Week</h1>
      <div className="ChoresSchedule-container">
        <div className="ChoresSchedule-days">
          <h3>Monday</h3>
          <div>{mondays}</div>
        </div>
        <div className="ChoresSchedule-days">
          <h3>Tuesday</h3>
          <div>{tuesdays}</div>
        </div>
        <div className="ChoresSchedule-days">
          <h3>Wednesday</h3>
          <div>{wednesdays}</div>
        </div>
        <div className="ChoresSchedule-days">
          <h3>Thursday</h3>
          <div>{thursdays}</div>
        </div>
        <div className="ChoresSchedule-days">
          <h3>Friday</h3>
          <div>{fridays}</div>
        </div>
        <div className="ChoresSchedule-days">
          <h3>Saturday</h3>
          <div>{saturdays}</div>
        </div>
        <div className="ChoresSchedule-days">
          <h3>Sunday</h3>
          <div>{sundays}</div>
        </div>
      </div>
    </>
  );
};

export default ChoreSchedule;
