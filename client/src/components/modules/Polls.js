import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

const Polls = (props) => {
  const [pollVote, setPollVote] = useState(undefined);
  const [currRes, setCurrRes] = useState(props.poll.votes);

  const handleChangePollVotes = (event) => {
    setPollVote(event.target.value);
  };

  let currentResults = [];

  const handleSubmit = () => {
    if (!props.poll.usersWhoVoted.includes(props.userid)) {
      post("/api/poll/vote", {
        pollid: props.poll._id,
        option: pollVote,
        uservoted: props.userid,
      }).then((newPollObj) => {
        setCurrRes(newPollObj.votes);
      });
    } else {
      alert("You can't vote more than once!");
    }
  };

  let pollList = [];
  for (let i = 0; i < props.poll.pollOptions.length; i++) {
    pollList.push(
      <>
        <input
          className="PostAnnouncements-inputs"
          type="radio"
          id={props.poll.pollOptions[i]}
          name={props.poll._id}
          value={props.poll.pollOptions[i]}
          onChange={handleChangePollVotes}
        ></input>
        <label htmlFor={props.poll.pollOptions[i]}>{props.poll.pollOptions[i]}</label>
      </>
    );
  }

  for (let i = 0; i < currRes.length; i++) {
    currentResults.push(
      <div>
        {props.poll.pollOptions[i]}: {currRes[i]} votes
      </div>
    );
  }

  return (
    <div>
      <div>{pollList}</div>
      <button className="Input-button" type="submit" value="Submit" onClick={handleSubmit}>
        Vote
      </button>
      <div>Current results: {currentResults}</div>
    </div>
  );
};

export default Polls;
