const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createDonorRequest, getDonorRequestById } = require("./dr.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createDonorRequest
);

router.get("/:donorReuestId", getDonorRequestById);
module.exports = router;
