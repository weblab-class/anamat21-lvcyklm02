import React, { useState, useEffect, Component } from "react";

import "../../utilities.css";
import Input from "../modules/Input.js";
import { PostAnnouncements } from "../modules/PostAnnouncements";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

const Announcements = (props) => {
  const [user, setUser] = useState();
  const [group, setGroup] = useState();

  useEffect(() => {
    get("/api/user/group", { userid: props.userId }).then((Obj) => {
      setUser(Obj.user_);
      setGroup(Obj.group_);
    });
  }, []);

  console.log(user);

  if (!user) {
    return <div> Loading! </div>;
  }

  if (!group) {
    return <div> Please join a group to see your group's announcements! </div>;
  }

  const postAnnouncement = (text) => {
    console.log(user);

    const newAnnouncement = {
      content: text,
      author: user.name,
      group: group._id,
    };
    console.log(newAnnouncement);

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
        <h3>All of {group.name}'s announcements:</h3>
        <PostAnnouncements groupid={group._id} />
      </div>
    </>
  );
};

export default Announcements;
