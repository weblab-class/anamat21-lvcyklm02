import React, { useState, useEffect, Component } from "react";

import "../../utilities.css";
import "./Announcements.css";

import Input from "../modules/Input.js";
import { NewAnnouncement, PostAnnouncements } from "../modules/PostAnnouncements";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

const Announcements = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState();
  const [group, setGroup] = useState();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    get("/api/user/group", { userid: props.userId }).then((Obj) => {
      setUser(Obj.user_);
      setGroup(Obj.group_);
    });
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }

  if (!group) {
    return <div> Please join a group to see your group's announcements! </div>;
  }

  const postPoll = (ann) => {
    if (type === "Poll") {
      let votes = [];
      for (let i = 0; i < ann.pollOptions.length; i++) {
        votes.push(0);
      }
      console.log("am i here?");

      const newpoll = {
        annid: ann._id,
        pollopt: ann.pollOptions,
        votes: votes,
      };

      post("/api/announcement/poll", newpoll).then((newPollObj) => {
        console.log("it logged! (poll)");
      });
    }
  };

  const postAnnouncement = (title, content, tags, type, pollOptions) => {
    console.log("im at post annoucne");

    const newAnnouncement = {
      title: title,
      content: content,
      author: user.name,
      group: group._id,
      tags: tags.split(" "),
      type: type,
      pollOptions: pollOptions.split(" "),
    };

    if (type === "Poll") {
      let votes = [];
      for (let i = 0; i < newAnnouncement.pollOptions.length; i++) {
        votes.push(0);
      }
      console.log("am i here?");

      const newpoll = {
        pollopt: newAnnouncement.pollOptions,
        votes: votes,
      };

      post("/api/announcement/poll", { newAnnouncement, newpoll }).then((newPollObj) => {
        console.log("it logged! (poll)");
      });
    } else {
      post("/api/announcement", newAnnouncement).then((ann) => {
        console.log("it logged! (announcement)");
      });
    }
  };

  const deleteTag = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };

  let tagsHtml = [];

  for (let i = 0; i < tags.length; i++) {
    tagsHtml.push(
      <div className="Announcements-announcement-tags">
        <p>{tags[i]}</p>
        <button className="Announcements-cancel-button" onClick={() => deleteTag(tags[i])}>
          x
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="Announcements-search-container">
        <div className="Announcements-container">
          <div className="Announcements-sub-container">
            <button
              className="Announcements-new-button"
              onClick={() => setIsClicked(true)}
            ></button>
            {isClicked ? (
              <div className="Announcements-sub-new-container">
                <NewAnnouncement onSubmit={postAnnouncement} />
                <button className="Announcements-cancel-button" onClick={() => setIsClicked(false)}>
                  cancel
                </button>
              </div>
            ) : (
              <p>Press the + button to make a new announcement</p>
            )}
          </div>
          <div>
            <h3>All of {group.name}'s announcements:</h3>
            <PostAnnouncements userid={user._id} groupid={group._id} tags={tags} />
          </div>
        </div>
        <div className="Announcements-search-subcontainer">
          <h3>Search</h3>
          <Input
            defaultText={"Enter (1) tag"}
            type={"text"}
            onSubmit={(text) => setTags(tags.concat([text]))}
          />
          <div className="Announcements-tags-container">{tagsHtml}</div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
