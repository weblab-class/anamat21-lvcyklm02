import React from "react";

const WeekDates = () => {
  const todaysDate = new Date();
  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const getLetterDay = (date) => {
    const JS_Day = "UMTWRFS";
    return JS_Day.charAt(date.getDay());
  };
  const weekDaysDict = {};

  for (let i = 0; i < 7; i++) {
    const newDay = addDays(todaysDate, i);
    weekDaysDict[getLetterDay(newDay)] = newDay;
  }

  return weekDaysDict;
};

export default WeekDates;
