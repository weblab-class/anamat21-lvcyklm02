import React, { useState } from "react";
import { post } from "../../utilities";
import "./ChoresSchedule.css";

/**
 * ChoreEvent is a component for unique chore contents
 *
 * Proptypes
 * @param func deleteChore(_id) a function call to delete chore from list and db
 * @param {[string]} freq // M,T,W,R,F,S,U
 * @param {number} hand // number of people needed
 * @param {string} content of chore
 */
const ChoreEvent = (props) => {
  return (
    <tr>
      <td>{props.content}</td>
      <td>{props.freq}</td>
      <td>{props.hand}</td>
      <td>
        <button onClick={props.deleteChore}>x</button>
      </td>
    </tr>
  );
};
/**
 * NewChoreEvent is a component to create a new unique chore contents
 *
 * Proptypes
 * @param {string} _id of the chore //Not done yet
 * @param {[string]} freq // M,T,W,R,F,S,U
 * @param {number} hand // number of people needed
 * @param {string} content of chore
 *
 *  function addChoreToState = addChoreToState
 */
const NewChoreEvent = (props) => {
  //states
  const [inputD, setInputD] = useState("");
  const [inputFreq, setInputFreq] = useState(0);
  const [inputHand, setInputHand] = useState(0);

  //functions

  const handleChangeD = (event) => {
    const value = event.target.value;
    setInputD(value);
  };

  const handleChangeFreq = (event) => {
    const value = event.target.value;
    setInputFreq(value);
  };
  const handleChangeHand = (event) => {
    const value = event.target.value;
    setInputHand(value);
  };
  const handleSubmit = () => {
    console.log(inputD, inputFreq, inputHand, props.groupid);
    const body = {
      content: inputD,
      freq: inputFreq,
      hand: inputHand,
      group: props.groupid,
    };
    //eventually adds chores
    post("/api/chore", body).then((chore) => {
      props.addChoreToState(chore);
      //refresh
      setInputD("");
      setInputFreq(0);
      setInputHand(0);
    });
  };

  return (
    <>
      <tr>
        <td>
          <input className="strInput" type="text" value={inputD} onChange={handleChangeD}></input>
        </td>
        <td>
          <input
            className="strInput"
            type="text"
            value={inputFreq}
            onChange={handleChangeFreq}
          ></input>
        </td>
        <td>
          <input
            className="strInput"
            type="text"
            value={inputHand}
            onChange={handleChangeHand}
          ></input>
        </td>
      </tr>
      <tr>
        <button onClick={handleSubmit}>Add Chore Event +</button>
      </tr>
    </>
  );
};

export { ChoreEvent, NewChoreEvent };
