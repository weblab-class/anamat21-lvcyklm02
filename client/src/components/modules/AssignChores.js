import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./ChoresSchedule.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

const AssignChores = (group) => {
  let choreList = [];
  let userList = [];

  get("/api/chore", { groupid: group._id }).then((chores) => {
    choreList = chores;
    userList = group.members;
  });

  const randomUsersList = (num) => {
    let randUsers = [];

    for (let i = 0; i < num; i++) {
      let randomIndex = Math.floor(Math.random() * userList.length);
      let randomUser = userList[randomIndex];
      randUsers.push("randomUser");
    }

    return randUsers;
  };

  for (let i = 0; i < choreList.length; i++) {
    if (choreList[i].freq === 1) {
      const assignment = {
        days: ["Su"],
        users: randomUsersList(choreList[i].hand),
      };

      post("/api/chore/assignment", { choreid: choreList[i]._id, assignment: assignment }).then(
        (choreObj) => {
          console.log("it logged!");
        }
      );
    }
    if (choreList[i].freq === 2) {
      const assignment = {
        days: ["M", "Th"],
        users: randomUsersList(choreList[i].hand),
      };

      post("/api/chore/assignment", { choreid: choreList[i]._id, assignment: assignment }).then(
        (choreObj) => {
          console.log("it logged!");
        }
      );
    }
    if (choreList[i].freq === 3) {
      const assignment = {
        days: ["M", "W", "F"],
        users: randomUsersList(choreList[i].hand),
      };

      post("/api/chore/assignment", { choreid: choreList[i]._id, assignment: assignment }).then(
        (choreObj) => {
          console.log("it logged!");
        }
      );
    }
    if (choreList[i].freq === 4) {
      const assignment = {
        days: ["Su", "Tu", "Th", "Sa"],
        users: randomUsersList(choreList[i].hand),
      };

      post("/api/chore/assignment", { choreid: choreList[i]._id, assignment: assignment }).then(
        (choreObj) => {
          console.log("it logged!");
        }
      );
    }
    if (choreList[i].freq === 5) {
      const assignment = {
        days: ["Su", "Tu", "W", "Th", "Sa"],
        users: randomUsersList(choreList[i].hand),
      };

      post("/api/chore/assignment", { choreid: choreList[i]._id, assignment: assignment }).then(
        (choreObj) => {
          console.log("it logged!");
        }
      );
    }
    if (choreList[i].freq === 6) {
      const assignment = {
        days: ["M", "Tu", "W", "Th", "F", "Sa"],
        users: randomUsersList(choreList[i].hand),
      };

      post("/api/chore/assignment", { choreid: choreList[i]._id, assignment: assignment }).then(
        (choreObj) => {
          console.log("it logged!");
        }
      );
    }
    if (choreList[i].freq > 6) {
      const assignment = {
        days: ["Su", "M", "Tu", "W", "Th", "F", "Sa"],
        users: randomUsersList(choreList[i].hand),
      };

      post("/api/chore/assignment", { choreid: choreList[i]._id, assignment: assignment }).then(
        (choreObj) => {
          console.log("it logged!");
        }
      );
    }
  }
};

export default AssignChores;
