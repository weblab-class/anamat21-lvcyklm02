import React, { useState, useEffect, Component } from "react";

import "../../utilities.css";
import Input from "../modules/Input.js";
import { PostAnnouncements } from "../modules/PostAnnouncements";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

const Announcements = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }

  const postAnnouncement = (text) => {
    console.log(user);

    const newAnnouncement = {
      content: text,
      author: user.name,
    };

    post("/api/announcement", newAnnouncement).then(() => {
      console.log("it logged!");
    });
  };

  return (
    <>
      <div>
        <h3>Post an announcement:</h3>
        <Input defaultText={"Your announcement"} onSubmit={postAnnouncement} />
      </div>
      <div>
        <h3>All announcements</h3>
        <PostAnnouncements />
      </div>
    </>
  );
};

export default Announcements;
