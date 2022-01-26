import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./ChoresSchedule.css";
import WeekDates from "./WeekDates";

import { get, post } from "../../utilities";

const ChoreSchedule = (props) => {
  const [asList, setAsList] = useState([]);

  let chores = [];
  const one_chore = (con) => {
    return { content: con, complete: [], incomplete: [] };
  };

  // calendar days
  var string_days = [];
  var weekdates = WeekDates();
  for (const [key, value] of Object.entries(weekdates)) {
    string_days = [...string_days, key + " " + value.getMonth() + 1 + "/" + value.getDate()];
  }

  let schedule = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  useEffect(() => {
    // BUG: currently can't update state with all assignments
    get("/api/assignment", { groupid: props.group._id })
      .then((ass) => {
        for (let step = 0; step < ass.length; step++) {}
      })
      .then(() => {
        setAsList(chores);

        //update schedule
      });
  }),
    [asList];

  return (
    <>
      <h1>Chores Schedule This Week</h1>
      <p>Does this even work?</p>
      <p>{string_days}</p>
      <p>{asList}</p>
    </>
  );
};

export default ChoreSchedule;
