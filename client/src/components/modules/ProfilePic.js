import React, { useState, useEffect } from "react";

import "../../utilities.css";
//import "./JoinGroup.css";

import Input from "./Input.js";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import { Redirect } from "@reach/router";

const ProfilePic = (props) => {
  const [profImg, setProfImg] = useState();

  const handleChange = (event) => {
    setProfImg(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("im here");

    const profpic = {
      user: props.user,
      picture: profImg,
    };
    console.log(profpic);

    post("/api/user/profile-pic", profpic).then((profpicObj) => {
      console.log("it logged!");
    });
  };

  return (
    <div>
      <input type="file" placeholder={props.defaultText} value={profImg} onChange={handleChange} />
      <button type="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ProfilePic;
