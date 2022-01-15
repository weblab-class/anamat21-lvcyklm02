import React from "react";
/**
 * ChoreEvent is a component for unique chore contents
 *
 * Proptypes
 * @param {string} _id of the chore //Not done yet
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
 *  function onSubmit
 */
const NewChoreEvent = (props) => {
  return "hello";
};

export { ChoreEvent, NewChoreEvent };
