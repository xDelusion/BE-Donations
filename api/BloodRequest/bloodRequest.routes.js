const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getRecipientById } = require("./bloodRequest.controller");

const jwtAuthenticate = passport.authenticate("jwt", { session: false });

router.get("/", jwtAuthenticate, getRecipientById);

module.exports = router;
