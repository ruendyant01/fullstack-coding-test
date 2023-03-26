const express = require('express')
const orgsRouter = require('./orgsRoute');
const userRouter = require('./userRoute');
const router = express.Router()
const auth = require('../middlewares/authentication');

router.use(userRouter);
router.use(auth);
router.use("/organization", orgsRouter);

module.exports = router