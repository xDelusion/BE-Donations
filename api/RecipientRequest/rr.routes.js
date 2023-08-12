const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getRecipientReqs, addRecipient } = require("./rr.controllers");

const jwtAuthenticate = passport.authenticate("jwt", { session: false });

router.get("/", getRecipientReqs);
router.post("/", jwtAuthenticate, addRecipient);

module.exports = router;
