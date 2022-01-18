import React, { useState, useEffect } from "react";
import { ChoreEvent, NewChoreEvent } from "./ChoreEvent";
import { get } from "../../utilities";

const ChoreList = (props) => {
  // states: list of chore events
  const [choreList, setChoreList] = useState([]);

  //load chore list from api
  useEffect(() => {
    get("/api/chore", { groupid: props.group._id }).then((chores) => {
      setChoreList(chores);
    });
  }, [choreList]);

  const addChoreToState = (choreObj) => {
    setChoreList([choreObj].concat(choreList));
  };

  //deletes from db naturally re-renders
  const deleteChoreObj = (choreId) => {
    console.log("attempting to delete", choreId);
    //deletes from db using choreId
  };

  return (
    <>
      <table>
        <caption>{props.group.name} Chore List</caption>
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
              deleteChore={() => deleteChoreObj(choreItem._id)}
            />
          ))}
        </tbody>
      </table>
      <NewChoreEvent groupid={props.group._id} addChoreToState={addChoreToState} />
    </>
  );
};

export default ChoreList;
