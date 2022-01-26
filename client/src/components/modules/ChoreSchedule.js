import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./ChoresSchedule.css";
import WeekDates from "./WeekDates";

import { get, post } from "../../utilities";

const ChoreSchedule = (props) => {
  //schedule states
  const [sun, setSun] = useState([]);
  const [mon, setMon] = useState([]);
  const [tues, setTues] = useState([]);
  const [wed, setWed] = useState([]);
  const [thur, setThur] = useState([]);
  const [fri, setFri] = useState([]);
  const [sat, setSat] = useState([]);

  //function dictionary
  let func_dict = [setSun, setMon, setTues, setWed, setThur, setFri, setSat];
  let letters = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let var_array = [sun, mon, tues, wed, thur, fri, sat];
  let all_chores = [[], [], [], [], [], [], []];

  // calendar days
  var string_days = [];
  // BUG: always updates the rendering day instead of when first assigned that week
  var weekdates = WeekDates();
  for (const [key, value] of Object.entries(weekdates)) {
    string_days = [
      ...string_days,
      letters[value.getDay()] + " " + value.getMonth() + 1 + "/" + value.getDate(),
    ];
  }

  useEffect(() => {
    get("/api/assignment", { groupid: props.group._id })
      .then((ass) => {
        for (let step = 0; step < ass.length; step++) {
          var day = new Date(ass[step].time).getDay();
          //BUG: Can't use get to find user information
          all_chores[day] = [
            ...all_chores[day],
            { content: ass[step].content, userid: ass[step].userid, status: ass[step].status },
          ];
        }
      })
      .then(() => {
        //update state variables
        for (let i = 0; i < 7; i++) {
          func_dict[i](all_chores[i]);
        }
      });
  }, []);

  return (
    <>
      <h1>Chores Schedule WE: {string_days[6]}</h1>
      <div className="ChoresSchedule-container">
        <div className="ChoresSchedule-day-container ChoresSchedule-label">
          <div className="ChoresSchedule-chore-container">
            <div className="ChoresSchedule-chore">
              <div className="ChoresSchedule-date">Day</div>
              <div className="ChoresSchedule-content">Chore</div>
              <div className="ChoresSchedule-user">Member</div>
              <div className="ChoresSchedule-status">Status</div>
            </div>
          </div>
        </div>

        {var_array.map((day_list, index) => (
          <div className="ChoresSchedule-day-container" key={"day" + index}>
            <div className="ChoresSchedule-date ChoresSchedule-label">{string_days[index]}</div>
            <div className="ChoresSchedule-chore-container">
              {day_list.map((item, index) => (
                <div className="ChoresSchedule-chore" key={"choreitem" + index}>
                  <div className="ChoresSchedule-content">{item.content}</div>
                  <div className="ChoresSchedule-user">{item.userid + ""}</div>
                  <div className="ChoresSchedule-status">{item.status}</div>
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
