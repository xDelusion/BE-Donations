const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createDonorRequest,
  getDonorRequestById,
  getAllRequest,
  getDonorRequestByUserId,
  updateDonorRequest,
} = require("./dr.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createDonorRequest
);

router.get("/:donorRequestId", getDonorRequestById);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  getDonorRequestByUserId
);
router.put(
  "/:recipientId ",
  passport.authenticate("jwt", { session: false }),
  updateDonorRequest
);

router.get("/", getAllRequest);

module.exports = router;
