import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./ChoresSchedule.css";
import WeekDates from "./WeekDates";

import { get, post } from "../../utilities";

const ChoreSchedule = (props) => {
  const [asList, setAsList] = useState([]);

  //schedule
  const [sun, setSun] = useState([]);
  const [mon, setMon] = useState([]);
  const [tues, setTues] = useState([]);
  const [wed, setWed] = useState([]);
  const [thur, setThur] = useState([]);
  const [fri, setFri] = useState([]);
  const [sat, setSat] = useState([]);

  const one_chore = (con) => {
    return { content: con, complete: [], incomplete: [] };
  };

  //function dictionary
  let func_dict = [setSun, setMon, setTues, setWed, setThur, setFri, setSat];
  let letters = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let var_array = [sun, mon, tues, wed, thur, fri, sat];
  let all_chores = [[], [], [], [], [], [], []];

  // calendar days
  var string_days = [];
  var weekdates = WeekDates();
  for (const [key, value] of Object.entries(weekdates)) {
    string_days = [
      ...string_days,
      letters[value.getDay()] + " " + value.getMonth() + 1 + "/" + value.getDate(),
    ];
  }

  useEffect(() => {
    // BUG: currently can't update state with all assignments
    get("/api/assignment", { groupid: props.group._id })
      .then((ass) => {
        console.log("what");
        for (let step = 0; step < ass.length; step++) {
          var day = new Date(ass[step].time).getDay();
          all_chores[day] = [...all_chores[day], ass[step].content];
        }
      })
      .then(() => {
        //update state variables
        for (let i = 0; i < 7; i++) {
          func_dict[i](all_chores[i]);
        }
      })
      .then(() => {
        // reorder list for rendering
      });
  }, []);

  return (
    <>
      <h1>Chores Schedule WE: {string_days[6]}</h1>
      <div className="ChoresSchedule-container">
        {var_array.map((day_list, index) => (
          <div className="ChoresSchedule-day-container" key={"day" + index}>
            <div className="ChoresSchedule-date">{string_days[index]}</div>
            <div className="ChoresSchedule-items-container">
              {day_list.map((item, index) => (
                <div className="ChoresSchedule-items" key={"choreitem" + index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChoreSchedule;
