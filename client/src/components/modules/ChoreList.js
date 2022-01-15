import React, { useState } from "react";
import { ChoreEvent, NewChoreEvent } from "./ChoreEvent";

const ChoreList = (props) => {
  // states: list of chore events
  const [choreList, setChoreList] = useState([]);

  //load chore list from api

  return (
    <>
      <table>
        <caption>iHouse Chore List</caption>
        <thead>
          <tr>
            <th>Description</th>
            <th>Freq</th>
            <th>People</th>
          </tr>
        </thead>
        <tbody>
          <ChoreEvent content="empty dish rack" freq={1} hand={3} />
          <ChoreEvent content="sweep kitchen floor" freq={3} hand={3} />
        </tbody>
      </table>
      <NewChoreEvent />
    </>
  );
};

export default ChoreList;
