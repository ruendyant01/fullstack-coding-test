const express = require('express')
const userRouter = express.Router()
const Controller = require('../controllers/index');

userRouter.post("/register", Controller.register);
userRouter.post("/login", Controller.login);
userRouter.get("/", Controller.allOrgs);


module.exports = userRouter