/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Chore = require("./models/chore");
const Group = require("./models/group");
const Announcement = require("./models/announcement");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

const updateUser = () => {};

router.post("/chore", (req, res) => {
  const newChore = new Chore({
    content: req.body.content,
    freq: req.body.freq,
    hand: req.body.hand,
    currentlyAssigned: [],
  });

  newChore.save().then((chore) => {
    res.send(chore);
  });
});

router.get("/chore", (req, res) => {
  //return all chores
  Chore.find({}).then((chores) => res.send(chores));
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/user/group", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    if (user.groupid.length != 0) {
      Group.findById(user.groupid[user.groupid.length - 1]).then((group) => {
        res.send({ user_: user, group_: group });
      });
    } else {
      res.send({ user_: user, group_: null });
    }
  });
});

router.get("/group", auth.ensureLoggedIn, (req, res) => {
  Group.findById(req.query.groupid).then((group) => {
    res.send(group);
  });
});

router.post("/group/add", auth.ensureLoggedIn, (req, res) => {
  Group.findById(req.body.groupid).then((group) => {
    // do the same logic in creating a new group
    if (group !== null) {
      group.members.push(req.user._id);
      group.save().then((group) => {
        User.findById(req.user._id).then((user) => {
          user.groupid.push(group._id);
          user.save().then((user) => {
            res.send(group);
          });
        });
      });
    } else {
      res.send({ group: null });
    }
  });
});

router.post("/group", auth.ensureLoggedIn, (req, res) => {
  const newGroup = new Group({
    name: req.body.name,
    members: [req.user._id],
    chores: [],
    points: 0,
  });

  newGroup.save().then((group) => {
    User.findOne({ _id: req.user._id }).then((user) => {
      user.groupid.push(group._id);
      user.save().then((user) => {
        res.send(group);
      });
    });
  });
});

router.get("/announcement", (req, res) => {
  Announcement.find({ group: req.query.groupid }).then((ann) => {
    res.send(ann);
  });
});

router.post("/group/announcements", (req, res) => {
  Announcement.find({ group: req.body.groupid }).then((ann) => {
    res.send(ann);
  });
});

router.post("/announcement", (req, res) => {
  const newAnnouncement = new Announcement({
    content: req.body.content,
    author: req.body.author,
    group: req.body.group,
  });
  newAnnouncement.save().then((announce) => res.send(announce));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
