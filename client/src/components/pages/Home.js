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
          userObj.groupid = groupObj;
        });
      });
    });

    return <Redirect to="/status/" />;
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
      <div className="Skeleton-container">
        <h1>Ready to build your community?</h1>
        <h3>
          Join PodMates with your community members, by joining an existing group or creating a new
          one!
        </h3>
      </div>
      <div>
        <div>
          <h1>Make a new PodMates living community:</h1>
          <Input defaultText={"New group name"} onSubmit={onSubmitNew} />
        </div>
        <div>
          <h1>Join an existing living community:</h1>
          <Input defaultText={"Find group"} onSubmit={onSubmitJoin} />
          {clicked ? console.log("clicked") : console.log("not clicked")}
        </div>
      </div>
    </>
  );
};

export default Home;
