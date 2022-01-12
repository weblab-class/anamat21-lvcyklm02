import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

// edited to project's google client_Id
const GOOGLE_CLIENT_ID = "906485839568-enlavp0b4pbshg8vaopc8019aet1rfie.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
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
      <div>
        <h1>Welcome to PodMates!</h1>
        <h3>Little introduction</h3>
      </div>
      <div>
        <h1>Make a new PodMates living community:</h1>
        <h1>Join an existing living community:</h1>
      </div>
    </>
  );
};

export default Skeleton;
