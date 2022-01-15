import React from "react";
import ChoreSchedule from "../modules/ChoreSchedule";

const Chores = () => {
  return (
    <>
      <div className="container-chores-schedule">
        <ChoreSchedule />
      </div>
      <div className="container-chores-list">
        <h1>Insert iHouse Chores List</h1>
      </div>
      <div className="container-chores-refresh">
        <p>5 days till refresh</p>
        <button>Manually refresh now</button>
      </div>
    </>
  );
};

export default Chores;
