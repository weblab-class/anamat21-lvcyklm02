import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./ChoresSchedule.css";

import { get, post } from "../../utilities";

const ChoreSchedule = (props) => {
  const [assignmentList, setAssignmentList] = useState([]);
  const [userList, setUserList] = useState([]);

  //load chore and users list from api
  // useEffect(() => {
  //   get("/api/chore", { groupid: props.group._id }).then((chores) => {
  //     setChoreList(chores);
  //     setUserList(props.group.members);
  //   });
  // }, [choreList, userList]);

  useEffect(() => {
    get("/api/assignment", { groupid: props.group._id }).then((assignments) => {
      setAssignmentList(assignments);
      setUserList(props.group.members);
      console.log(assignmentList);
    });
  }, [assignmentList, userList]);

  let mondays = [];
  let tuesdays = [];
  let wednesdays = [];
  let thursdays = [];
  let fridays = [];
  let saturdays = [];
  let sundays = [];

  for (let i = 0; i < assignmentList.length; i++) {
    // identify relevant info
    get("/api/chore", { _id: assignmentList[i].choreid }).then((chore) => {
      // console.log(my_chore.content);
      let chore_name = chore.content;

      // if (chore_days.includes("M")) {
      //   mondays.push(
      //     <p className="ChoreSchedule-ids">
      //       {chore_name}: {chore_users}
      //     </p>
      //   );
      // }
    });
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
