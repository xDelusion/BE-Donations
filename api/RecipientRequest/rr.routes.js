const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getRecipientReqs } = require("./rr.controllers");

router.get("/", getRecipientReqs);
router.post("/", passport.authenticate("jwt", { session: false }), addCategory);
