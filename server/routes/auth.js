// import express from "express";
// import { signup,signin, logout, googleAuthSignIn, generateOTP, verifyOTP, createResetSession,findUserByEmail, resetPassword } from "../controllers/auth.js";
// import { verifyToken } from "../middleware/verifyToken.js";
// import { localVariables } from "../middleware/auth.js";

const express = require("express");
const authControllers = require("../controllers/auth.js");
const verifyTokenMiddleware = require("../middleware/verifyToken.js");
const authMiddleware = require("../middleware/auth.js");

const {
  signup,
  signin,
  logout,
  googleAuthSignIn,
  generateOTP,
  verifyOTP,
  createResetSession,
  findUserByEmail,
  resetPassword
} = authControllers;

const { verifyToken } = verifyTokenMiddleware;
const { localVariables } = authMiddleware;

const router = express.Router();

//create a user
router.post("/signup", signup);
//signin
router.post("/signin", signin);
//logout
router.post("/logout", logout);
//google signin
router.post("/google", googleAuthSignIn);
//find user by email
router.get("/findbyemail", findUserByEmail);
//generate opt
router.get("/generateotp",localVariables, generateOTP);
//verify opt
router.get("/verifyotp", verifyOTP);
//create reset session
router.get("/createResetSession", createResetSession);
//forget password
router.put("/forgetpassword", resetPassword);



module.exports = router;