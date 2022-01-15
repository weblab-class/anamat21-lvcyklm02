import React from "react";
import ChoreSchedule from "../modules/ChoreSchedule";
import ChoreList from "../modules/ChoreList";
import "./Chores.css";

const Chores = () => {
  return (
    <div className="box">
      <div className="item container-chores-schedule">
        <ChoreSchedule />
      </div>

      <div className="item container-chores-panel">
        <div className="item container-chores-list">
          <ChoreList />
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
