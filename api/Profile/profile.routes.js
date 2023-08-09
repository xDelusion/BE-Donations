const express = require("express");
const { getProfile, updateProfile } = require("./profile.controller");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");
const upload = require("../../middlewares/uploader");

const jwtAuthenticate = passport.authenticate("jwt", { session: false });
// router.get("/:userId", getOneProfileById);
router.get("/", jwtAuthenticate, getProfile);
router.put("/", upload.single("image"), jwtAuthenticate, updateProfile);
module.exports = router;
