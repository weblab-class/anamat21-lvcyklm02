import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./PostAnnouncements.css";

import Input from "./Input.js";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import { Redirect } from "@reach/router";

const AnnouncementRender = (props) => {
  return (
    <div className="PostAnnouncements-container">
      <div className="PostAnnouncements-announcement-heading">
        <h3>{props.author}</h3>
        <p>
          <i>{props.time}</i>
        </p>
      </div>
      <h1>{props.content}</h1>
    </div>
  );
};

const PostAnnouncements = (props) => {
  const [announcements, setAnnouncements] = useState([]);

  post("/api/group/announcements", { groupid: props.groupid }).then((announcementObjs) => {
    setAnnouncements(announcementObjs);
  });

  return (
    <>
      <div>
        {announcements.reverse().map((ann, index) => (
          <AnnouncementRender
            author={ann.author}
            time={ann.time}
            content={ann.content}
            group={ann.group}
            key={`announcement-${index}`}
          />
        ))}
      </div>
    </>
  );
};

export { AnnouncementRender, PostAnnouncements };