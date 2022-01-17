import React, { useState, useEffect, Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Home.css";
import { JoinGroup, MakeNewGroup } from "../modules/JoinGroup.js";
import Input from "../modules/Input.js";
import Status from "./Status.js";

import { get, post } from "../../utilities";
import { Router, Redirect } from "@reach/router";

// edited to project's google client_Id
const GOOGLE_CLIENT_ID = "906485839568-enlavp0b4pbshg8vaopc8019aet1rfie.apps.googleusercontent.com";

/**
 * Home/Login page
 *
 * Proptypes
 * param {String} userId is the user id from login in
 * param {function} handleLogin is function to login
 * param {function} handleLogout is function to logout
 */

const Home = ({ userId, handleLogin, handleLogout }) => {
  let clicked = false;

  const onSubmitJoin = (text) => {
    // const [groupid, setGroupId] = useState(undefined);

    // setGroupId(text);
    useEffect(() => {
      get("/api/group", { groupid: text }).then((groupObj) => {
        get(`/api/user`, { userid: userId }).then((userObj) => {
          userObj.groupid.concat(groupObj);
        });
      });
    });
  };

  const onSubmitNew = (text) => {
    // const [groupname, setGroupName] = useState(undefined);

    // setGroupName(text);
    console.log(text);

    console.log("hello");
    const newgroup = {
      name: text,
      members: [userId],
      chores: [],
      points: 0,
    };
    post("/api/group", newgroup).then(() => {
      console.log("it logged!");
    });
  };

  return (
    <>
      <div className="Home-container Home-div">
        <div className="Home-div">
          <h1>Ready to build your community?</h1>
          <h2>
            Join PodMates with your community members, by joining an existing group or creating a
            new one!
          </h2>
        </div>
        <div className="Home-subcontainer Home-div">
          <div className="Home-subsubcontainer Home-div">
            <h3>First log in here with your Google account:</h3>
            {userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={handleLogout}
                onFailure={(err) => console.log(err)}
              />
            ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={(err) => console.log(err)}
              />
            )}
          </div>
          <div className="Home-subsubcontainer Home-div">
            <h3>And if you haven't joined a living community group, do one of the following:</h3>
            <div className="Home-div">
              <h3>Make a new PodMates living community:</h3>
              <Input defaultText={"New group name"} type={"text"} onSubmit={onSubmitNew} />
            </div>
            <div className="Home-div">
              <h3>Join an existing living community:</h3>
              <Input defaultText={"Find group"} type={"text"} onSubmit={onSubmitJoin} />
              {clicked ? console.log("clicked") : console.log("not clicked")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
