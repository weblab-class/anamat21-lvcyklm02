import React, { useState, useEffect, Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Home.css";
import JoinGroup from "../modules/JoinGroup.js";
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
            {userId ? <JoinGroup userId={userId} /> : <p>Log in first to join or make a group!</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
