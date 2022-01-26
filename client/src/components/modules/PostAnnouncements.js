import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./PostAnnouncements.css";

import Input from "./Input.js";
import Polls from "./Polls.js";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import { Redirect } from "@reach/router";

const NewAnnouncement = (props) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState("");
  const [pollOptions, setPollOptions] = useState("");

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeTags = (event) => {
    setTags(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangePollOptions = (event) => {
    setPollOptions(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("im here");
    props.onSubmit(content, title, tags, type, pollOptions);
  };

  const addPoll = () => {
    return (
      <div>
        <input
          className="PostAnnouncements-inputs"
          type="text"
          name="title"
          onChange={handleChangePollOptions}
          defaultValue="Add poll options separated by a space"
        ></input>
      </div>
    );
  };

  return (
    <div className="PostAnnouncements-new-announcement-container">
      <form name="announcementForm" onSubmit={handleSubmit}>
        <div>
          <input
            className="PostAnnouncements-inputs"
            type="radio"
            id="typeChoice1"
            name="contact"
            value="message"
            onChange={handleChangeType}
          ></input>
          <label htmlFor="typeChoice1">Message</label>

          <input
            className="PostAnnouncements-inputs"
            type="radio"
            id="typeChoice2"
            name="contact"
            value="Poll"
            onChange={handleChangeType}
          ></input>
          <label htmlFor="typeChoice2">Poll</label>
        </div>
        <div>
          <input
            className="PostAnnouncements-inputs"
            type="text"
            name="title"
            onChange={handleChangeTitle}
            defaultValue="Subject"
          ></input>
        </div>
        <div>
          <textarea
            className="PostAnnouncements-inputs"
            name="content"
            onChange={handleChangeContent}
            defaultValue="Announcement"
          ></textarea>
        </div>
        <div>{type === "Poll" ? addPoll() : <div></div>}</div>
        <div>
          <input
            className="PostAnnouncements-inputs"
            type="text"
            name="tags"
            onChange={handleChangeTags}
            defaultValue="Add tags separated by a space"
          ></input>
        </div>
        <input className="PostAnnouncements-inputs" type="submit" value="submit"></input>
      </form>
    </div>
  );
};

const AnnouncementRender = (props) => {
  let [pollObj, setPollObj] = useState(undefined);

  if (props.type === "Poll") {
    get("/api/poll", { annid: props.id }).then((pollObj) => {
      setPollObj(pollObj);
    });
  }

  let timeWord = "seconds";

  let announTime = new Date(props.time);
  let timeFromNow = Math.round((Date.now() - announTime.getTime()) / 1000);

  if (timeFromNow >= 60) {
    timeFromNow = Math.round(timeFromNow / 60);
    timeWord = "minutes";
    if (timeFromNow >= 60) {
      timeFromNow = Math.round(timeFromNow / 60);
      timeWord = "hours";
      if (timeFromNow >= 24) {
        timeFromNow = Math.round(timeFromNow / 24);
        timeWord = "days";
      }
    }
  }

  let tagsList = [];
  for (let i = 0; i < props.tags.length; i++) {
    tagsList.push(
      <p className="PostAnnouncements-announcement-text PostAnnouncements-announcement-tags">
        {props.tags[i]}
      </p>
    );
  }

  if (props.type === "Props" && pollObj === undefined) {
    return <div>loading!!</div>;
  }

  return (
    <div className="PostAnnouncements-container">
      <div className="PostAnnouncements-announcement-heading">
        <div className="PostAnnouncements-announcement-sub-heading">
          <h3 className="PostAnnouncements-announcement-text">{props.content}</h3>
          <p className="PostAnnouncements-announcement-text">
            <i>
              {props.author} posted {timeFromNow} {timeWord} ago
            </i>
          </p>
        </div>
        <div className="PostAnnouncements-announcement-sub-heading">{tagsList}</div>
      </div>
      <p className="PostAnnouncements-announcement-text">{props.title}</p>
      {!pollObj ? <div></div> : <Polls poll={pollObj} userid={props.userid} />}
    </div>
  );
};

const PostAnnouncements = (props) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    post("/api/search/announcements", { groupid: props.groupid, tags: props.tags }).then(
      (announcementObjs) => {
        setAnnouncements(announcementObjs);
      }
    );
  }, [props.tags]);

  return (
    <>
      <div>
        {announcements.reverse().map((ann, index) => (
          <AnnouncementRender
            id={ann._id}
            title={ann.title}
            author={ann.author}
            time={ann.time}
            content={ann.content}
            group={ann.group}
            tags={ann.tags}
            pollOptions={ann.pollOptions}
            type={ann.type}
            key={`announcement-${index}`}
            userid={props.userid}
          />
        ))}
      </div>
    </>
  );
};

export { NewAnnouncement, AnnouncementRender, PostAnnouncements };
