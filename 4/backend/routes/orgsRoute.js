const express = require('express')
const Controller = require('../controllers')
const orgsRouter = express.Router()

orgsRouter.get("/", Controller.myOrgs);
orgsRouter.post("/create", Controller.createOrgs);

module.exports = orgsRouter