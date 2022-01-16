import React, { useState, useEffect } from "react";

import "../../utilities.css";

import Input from "./Input.js";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import { Redirect } from "@reach/router";

const AnnouncementRender = (props) => {
  return (
    <div>
      <h3>{props.author}</h3>
      <p>
        <i>{props.time}</i>
      </p>
      <h1>{props.content}</h1>
    </div>
  );
};

const PostAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    get("/api/announcement", {}).then((announcementObjs) => {
      setAnnouncements(announcementObjs);
    });
  }, [announcements]);

  return (
    <>
      <div>
        {announcements.reverse().map((ann, index) => (
          <AnnouncementRender
            author={ann.author}
            time={ann.time}
            content={ann.content}
            key={`announcement-${index}`}
          />
        ))}
      </div>
    </>
  );
};

export { AnnouncementRender, PostAnnouncements };
