import React, { useState, useEffect, Component } from "react";

import "../../utilities.css";
import ChoreSchedule from "../modules/ChoreSchedule";
import ChoreList from "../modules/ChoreList";
import "./Chores.css";
import WeekDates from "../modules/WeekDates";

// import AssignChores from "../modules/ChoreList.js"; // need to refactor and pass in

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

  if (!user) {
    return <div> Loading! </div>;
  }

  if (!group) {
    return <div> Please join a group to see your group's chores! </div>;
  }

  // +++++++++ TIME HELPER FUNCTIONS +++++++++ //
  const freq_dict = {
    1: "M",
    2: "TS",
    3: "TRU",
    4: "MWFU",
    5: "MTRFS",
    6: "TWRFSU",
    7: "MTWRFSU",
  };

  // +++++++++ END OF HELPER FUNCTIONS +++++++++ //

  const assignChores = () => {
    // need to delete current assignments in group
    post("/api/assignment/delete", { groupid: group._id })
      .then((result) => {
        let choreList = [];
        let userList = [];

        get("/api/chore", { groupid: group._id }).then((chores) => {
          choreList = chores;
          userList = group.members;

          // helper functions
          // BUG: want to randomize order once and use it for the whole assignment
          const randomUsersList = (num) => {
            let randUsers = [];

            for (let i = 0; i < num; i++) {
              let randomIndex = Math.floor(Math.random() * userList.length);
              let randomUser = userList[randomIndex];
              randUsers.push(randomUser);
            }

            return randUsers;
          };

          //takes todays date and finds closest days
          const findNewDate = (index, freq) => {
            // find appropiate letter day
            const letter_day = freq_dict[freq].charAt(index);
            return WeekDates()[letter_day];
          };

          // main function:
          // for each chore
          for (let i = 0; i < choreList.length; i++) {
            // find people that will be random pool
            const chore_people = randomUsersList(choreList[i].hand);

            // for each frequency, make new assignment
            for (let j = 0; j < choreList[i].freq; j++) {
              let user_index = j % chore_people.length;
              post("/api/assignment", {
                userid: chore_people[user_index],
                choreid: choreList[i]._id,
                groupid: group._id,
                time: findNewDate(j, choreList[i].freq),
                content: choreList[i].content,
              }).then((choreObj) => {
                console.log("it logged!");
              });
            }
          }
        });
      })
      .catch(() => console.log("ERROR in deletion"));
    // need to refresh page and states
  };

  return (
    <div className="box">
      <div className="item container-chores-schedule">
        <ChoreSchedule group={group} />
      </div>

      <div className="item container-chores-panel">
        <div className="item container-chores-list">
          <ChoreList group={group} />
        </div>
        <div className="item container-chores-refresh">
          <p>5 days till refresh</p>
          <button onClick={assignChores}>Manually refresh now</button>
        </div>
      </div>
    </div>
  );
};

export default Chores;
