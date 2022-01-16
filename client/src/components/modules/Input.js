import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

/**
 * Handles all inputs
 *
 * Proptypes - from catbook, might change
 * param {string} defaultText is the placeholder text
 * param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */

const Input = (props) => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("im here");
    props.onSubmit(text);
  };

  return (
    <div>
      <input type="text" placeholder={props.defaultText} value={text} onChange={handleChange} />
      <button type="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Input;
