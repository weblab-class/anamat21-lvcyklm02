import React, { useState, useEffect } from "react";

const Status = (props) => {
  return (
    // building image
    <>
      <div>
        <img />
        <h1>Hello {props.name}!</h1>
        <h3>Your task for today is {props.chore}. Have you done it yet?</h3>
      </div>
      <div>
        <h2>
          {props.group} points: {props.groupPoints}
        </h2>
        <h2>
          {props.name} points: {props.userPoints}
        </h2>
      </div>
    </>
  );
};

export default Status;
