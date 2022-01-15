import React, { useState, useEffect } from "react";
import { ChoreEvent, NewChoreEvent } from "./ChoreEvent";
import { get } from "../../utilities";

const ChoreList = (props) => {
  // states: list of chore events
  const [choreList, setChoreList] = useState([]);

  //load chore list from api
  useEffect(() => {
    get("/api/chore", {}).then((chores) => {
      setChoreList(chores);
    });
  }, [choreList]);

  const addChoreToState = (choreObj) => {
    setChoreList([choreObj].concat(choreList));
  };

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
          {choreList.map((choreItem, index) => (
            <ChoreEvent
              content={choreItem.content}
              freq={choreItem.freq}
              hand={choreItem.hand}
              key={`chore-${index}`}
            />
          ))}
        </tbody>
      </table>
      <NewChoreEvent addChoreToState={addChoreToState} />
    </>
  );
};

export default ChoreList;
