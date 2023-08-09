const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createDonorRequest,
  getDonorRequestById,
  getAllRequest,
} = require("./dr.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createDonorRequest
);

router.get("/:donorRequestId", getDonorRequestById);

router.get("/", getAllRequest);

module.exports = router;
