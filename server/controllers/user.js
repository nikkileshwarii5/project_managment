// // import { createError } from "../error.js";
// // import User from "../models/User.js";
// // import Project from "../models/Project.js";
// // import Teams from "../models/Teams.js";
// // import Notifications from "../models/Notifications.js";

// const { createError } = require("../error.js");
// const User = require("../models/User.js");
// const Project = require("../models/Project.js");
// const Teams = require("../models/Teams.js");
// const Notifications = require("../models/Notifications.js");


// export const update = async (req, res, next) => {
//   if (req.params.id === req.user.id) {
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return next(createError(403, "You can update only your account!"));
//   }
// }

// export const deleteUser = async (req, res, next) => {
//   if (req.params.id === req.user.id) {
//     try {
//       await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("User has been deleted.");
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return next(createError(403, "You can delete only your account!"));
//   }
// }

// export const findUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// }

// export const getUser = async (req, res, next) => {
//   //if the req.user id is not present then it will give a message of user not authenticated 

//   try {
//     const user = await User.findById(req.user.id).populate("notifications").populate({
//       path: "teams",
//       populate: {
//         path: "members.id",
//         select: "_id name email",
//       }
//     }).populate("projects").populate("works").populate("tasks");
//     //extract the notification from the user and send it to the client
//     console.log(user)
//     res.status(200).json(user);
//   } catch (err) {
//     console.log(req.user)
//     next(err);
//   }
// }

// // get notifications of the user

// export const getNotifications = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     //extract the notification from the user and send it to the client
//     const notifications = user.notifications;
//     const notificationArray = [];
//     for (let i = 0; i < notifications.length; i++) {
//       const notification = await Notifications.findById(notifications[i]);
//       notificationArray.push(notification);
//     }
//     res.status(200).json(notificationArray);
//   } catch (err) {
//     next(err);
//   }
// }



// //fetch all the works of the user
// export const getWorks = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate(
//       {
//         path: "works",
//         populate: {
//           path: "tasks",
//           populate: {
//             path: "members",
//             select: "name img",
//           },
//         }
//       }).populate({
//         path: "works",
//         populate: {
//           path: "creatorId",
//           select: "name img",
//         }
//       })
//       .sort({ updatedAt: -1 });;
//     if (!user) return next(createError(404, "User not found!"));
//     //store all the works of the user in an array and send it to the client
//     const works = [];
//     await Promise.all(
//       user.works.map(async (work) => {
//         works.push(work);
//       })
//     ).then(() => {
//       res.status(200).json(works);
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// //get all the tasks of the user
// export const getTasks = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate({
//       path: "tasks",
//       populate: {
//         path: "members",
//         select: "name img",
//       }
//     }).sort({ end_date: 1 });
//     if (!user) return next(createError(404, "User not found!"));
//     //store all the tasks of the user in an array and send it to the client
//     const tasks = [];
//     await Promise.all(
//       user.tasks.map(async (task) => {
//         tasks.push(task);
//       })
//     ).then(() => {
//       res.status(200).json(tasks);
//     });
//   } catch (err) {
//     next(err);
//   }
// };



// export const subscribe = async (req, res, next) => {
//   try {
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: { subscribedUsers: req.params.id },
//     });
//     await User.findByIdAndUpdate(req.params.id, {
//       $inc: { subscribers: 1 },
//     });
//     res.status(200).json("Subscription successfull.")
//   } catch (err) {
//     next(err);
//   }
// }

// export const unsubscribe = async (req, res, next) => {
//   try {
//     try {
//       await User.findByIdAndUpdate(req.user.id, {
//         $pull: { subscribedUsers: req.params.id },
//       });
//       await User.findByIdAndUpdate(req.params.id, {
//         $inc: { subscribers: -1 },
//       });
//       res.status(200).json("Unsubscription successfull.")
//     } catch (err) {
//       next(err);
//     }
//   } catch (err) {
//     next(err);
//   }
// }

// //find project id from user and get it from projects collection and send it to client
// export const getUserProjects = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate("projects")
//     const projects = []
//     await Promise.all(user.projects.map(async (project) => {
//       await Project.findById(project).populate("members.id", "_id  name email img").then((project) => {
//         projects.push(project)
//       }).catch((err) => {
//         next(err)
//       })
//     })).then(() => {
//       res.status(200).json(projects)
//     }).catch((err) => {
//       next(err)
//     })
//   } catch (err) {
//     next(err);
//   }
// }

// //find team id from user and get it from teams collection and send it to client
// export const getUserTeams = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate("teams")
//     const teams = []
//     await Promise.all(user.teams.map(async (team) => {
//       await Teams.findById(team.id).then((team) => {
//         teams.push(team)
//       }).catch((err) => {
//         next(err)
//       })
//     })).then(() => {
//       res.status(200).json(teams)
//     }).catch((err) => {
//       next(err)
//     })
//   } catch (err) {
//     next(err);
//   }
// }

// //find user from email and send it to client
// export const findUserByEmail = async (req, res, next) => {
//   const email = req.params.email;
//   const users = [];
//   try {
//     await User.findOne({ email: { $regex: email, $options: "i" } }).then((user) => {
//       if(user!=null)
//       {
//         users.push(user);
//         res.status(200).json(users);
//       }else{
//         res.status(201).json({message:"No user found"});
//       }
//     }).catch((err) => {
//       next(err)
//     })
//   } catch (err) {
//     next(err);
//   }
// }


const { createError } = require("../error.js");
const User = require("../models/User.js");
const Project = require("../models/Project.js");
const Teams = require("../models/Teams.js");
const Notifications = require("../models/Notifications.js");

const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

const findUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("notifications")
      .populate({
        path: "teams",
        populate: {
          path: "members.id",
          select: "_id name email",
        },
      })
      .populate("projects")
      .populate("works")
      .populate("tasks");

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const notifications = user.notifications;
    const notificationArray = [];
    for (let i = 0; i < notifications.length; i++) {
      const notification = await Notifications.findById(notifications[i]);
      notificationArray.push(notification);
    }
    res.status(200).json(notificationArray);
  } catch (err) {
    next(err);
  }
};

const getWorks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "works",
        populate: {
          path: "tasks",
          populate: {
            path: "members",
            select: "name img",
          },
        },
      })
      .populate({
        path: "works",
        populate: {
          path: "creatorId",
          select: "name img",
        },
      })
      .sort({ updatedAt: -1 });

    const works = user.works;
    res.status(200).json(works);
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "tasks",
      populate: {
        path: "members",
        select: "name img",
      },
    }).sort({ end_date: 1 });

    const tasks = user.tasks;
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successful.");
  } catch (err) {
    next(err);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription successful.");
  } catch (err) {
    next(err);
  }
};

const getUserProjects = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("projects");
    const projects = [];
    for (let i = 0; i < user.projects.length; i++) {
      const project = await Project.findById(user.projects[i]).populate(
        "members.id",
        "_id name email img"
      );
      projects.push(project);
    }
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

const getUserTeams = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("teams");
    const teams = [];
    for (let i = 0; i < user.teams.length; i++) {
      const team = await Teams.findById(user.teams[i]);
      teams.push(team);
    }
    res.status(200).json(teams);
  } catch (err) {
    next(err);
  }
};

const findUserByEmail = async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  update,
  deleteUser,
  findUser,
  getUser,
  getNotifications,
  getWorks,
  getTasks,
  subscribe,
  unsubscribe,
  getUserProjects,
  getUserTeams,
  findUserByEmail,
};
