// import express from "express";
// import {
//   update,
//   deleteUser,
//   getUser,
//   subscribe,
//   unsubscribe,
//   getUserProjects,
//   getUserTeams,
//   findUser,
//   findUserByEmail,
//   getNotifications,
//   getWorks,
//   getTasks
// } from "../controllers/user.js";
// import { verifyToken } from "../middleware/verifyToken.js";

const express = require("express");
const userControllers = require("../controllers/user.js");
const verifyTokenMiddleware = require("../middleware/verifyToken.js");

const {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  getUserProjects,
  getUserTeams,
  findUser,
  findUserByEmail,
  getNotifications,
  getWorks,
  getTasks
} = userControllers;

const { verifyToken } = verifyTokenMiddleware;


const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id",verifyToken, findUser);
router.get("/find",verifyToken, getUser);

//get user projects
router.get("/projects", verifyToken, getUserProjects);

//get user teams
router.get("/teams", verifyToken, getUserTeams);

//search a user
router.get("/search/:email",verifyToken, findUserByEmail);

//get notifications of a user
router.get("/notifications", verifyToken, getNotifications);

//get works of a user
router.get("/works", verifyToken, getWorks);

//get tasks of a user
router.get("/tasks", verifyToken, getTasks);


module.exports = router;