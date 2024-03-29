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
const Assignment = require("./models/assignment");
const Poll = require("./models/poll");

// import authentication library
const auth = require("./auth");

//import generate schedule function
const gen = require("./generate-schedule");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { route } = require("express/lib/application");

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

router.post("/chore", (req, res) => {
  const newChore = new Chore({
    content: req.body.content,
    freq: req.body.freq,
    hand: req.body.hand,
    currentlyAssigned: [],
    group: req.body.group,
  });

  newChore.save().then((chore) => {
    res.send(chore);
  });
});

router.post("/chore/assignment", (req, res) => {
  Chore.findById(req.body.choreid).then((chore) => {
    chore.currentlyAssigned = req.body.assignment;
    for (let i = 0; i < req.body.assignment.users.length; i++) {
      User.findById(req.body.assignment.users[i]).then((user) => {
        if (!user.current_chores.includes(chore.content)) {
          user.current_chores.push(chore.content);
          user.save();
        }
      });
    }
    chore.save().then((chore) => res.send(chore));
  });
});

router.get("/chore", (req, res) => {
  //return all chores in a group
  Chore.find({ group: req.query.groupid }).then((chores) => res.send(chores));
});

router.get("/chore/byid", (req, res) => {
  //return all chores in a group
  Chore.find({ _id: req.query.choreid }).then((chores) => res.send(chores));
});

router.post("/chore/delete", (req, res) => {
  //return all chores in a group
  Chore.deleteOne({ _id: req.body.chore_id })
    .then((first) => console.log("deleted successfully"))
    .catch((second) => console.log("delete failed"));
});

// router.post("/poll/delete", (req, res) => {
//   //return all chores in a group
//   Poll.deleteMany({})
//     .then((first) => console.log("deleted successfully"))
//     .catch((second) => console.log("delete failed"));
// });

// router.get("/chore/users", (req, res) => {
//   Chore.find({ group: req.query.groupid }).then((chores) => {
//     Group.findById(req.query.groupid).then((group) => {
//       user_names = [];
//       for (let i = 0; i < group.members.length; i++) {
//         User.findById(group.members[i]).then((user) => {
//           user_names.push(user.name);
//         });
//       }
//       res.send({ chores_: chores, users_: group.members.name });
//     });
//   });
// });

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
  Group.findOne({ _id: req.body.groupid })
    .then((group) => {
      // do the same logic in creating a new group
      if (group !== null) {
        group.members.push(req.user._id);
        group.save().then((group) => {
          User.findById(req.user._id).then((user) => {
            user.groupid.push(group._id);
            user.points = 0;
            user.save().then((user) => {
              res.send(group);
            });
          });
        });
      } else {
        res.send({ group: null });
      }
    })
    .catch((error) => {
      res.send({ group: null });
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
      user.points = 0;
      user.save().then((user) => {
        res.send(group);
      });
    });
  });
});

router.post("/user/profile-pic", (req, res) => {
  User.findById(req.body.user._id).then((user) => {
    user.profile_picture = req.body.picture;
    user.save().then((user) => {
      res.send(user);
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

router.post("/search/announcements", (req, res) => {
  if (req.body.tags.length === 0) {
    Announcement.find({ group: req.body.groupid }).then((ann) => {
      res.send(ann);
    });
  } else {
    Announcement.find({ group: req.body.groupid, tags: { $in: req.body.tags } }).then((ann) => {
      res.send(ann);
    });
  }
});

router.post("/announcement", (req, res) => {
  const newAnnouncement = new Announcement({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    group: req.body.group,
    tags: req.body.tags,
    type: req.body.type,
    pollOptions: req.body.pollOptions,
  });
  newAnnouncement.save().then((announce) => res.send(announce));
});

router.post("/announcement/poll", (req, res) => {
  const newAnnouncement = new Announcement({
    title: req.body.newAnnouncement.title,
    content: req.body.newAnnouncement.content,
    author: req.body.newAnnouncement.author,
    group: req.body.newAnnouncement.group,
    tags: req.body.newAnnouncement.tags,
    type: req.body.newAnnouncement.type,
    pollOptions: req.body.newAnnouncement.pollOptions,
  });
  newAnnouncement.save().then((announce) => {
    const newPoll = new Poll({
      announcementId: announce._id,
      pollOptions: req.body.newpoll.pollopt,
      votes: req.body.newpoll.votes,
      usersWhoVoted: [],
    });
    newPoll.save().then((poll) => res.send(poll));
  });
});

router.get("/poll", (req, res) => {
  Poll.findOne({ announcementId: req.query.annid }).then((poll) => {
    res.send(poll);
  });
});

router.post("/poll/vote", (req, res) => {
  Poll.findById(req.body.pollid).then((poll) => {
    copyArr = [];
    for (let i = 0; i < poll.votes.length; i++) {
      if (i === poll.pollOptions.findIndex((element) => element === req.body.option)) {
        copyArr.push(poll.votes[i] + 1);
      } else {
        copyArr.push(poll.votes[i]);
      }
    }
    poll.votes = copyArr;
    poll.usersWhoVoted.push(req.body.uservoted);
    poll.save().then((newpoll) => res.send(newpoll));
  });
});

// ASSIGNMENT

router.post("/assignment", (req, res) => {
  const newAssignment = new Assignment({
    userid: req.body.userid,
    groupid: req.body.groupid,
    choreid: req.body.choreid,
    time: req.body.time,
    status: "incomplete",
    content: req.body.content,
  });
  newAssignment.save().then((announce) => res.send(announce));
});

router.get("/assignment", (req, res) => {
  Assignment.find({ groupid: req.query.groupid })
    .then((ass) => {
      res.send(ass);
    })
    .catch((error) => console.log("error"));
});

router.get("/assignment/byuser", (req, res) => {
  Assignment.find({ userid: req.query.userid })
    .then((ass) => {
      res.send(ass);
    })
    .catch((error) => console.log("error"));
});

router.post("/assignment/delete", (req, res) => {
  Assignment.deleteMany({ groupid: req.body.groupid })
    .then((first) => console.log("deleted successfully"))
    .catch((second) => console.log("delete failed"));

  res.send({ msg: "assignments deleted" });
});

router.post("/generateschedule", (req, res) => {
  console.log("calling server function");
  gen.GenerateSchedule("hello");
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
