const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  updateAppointment,
  getAppointment,
  addAppointment,
} = require("./appointment.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addAppointment
);

router.get("/", getAppointment);

router.put(
  "/:recipientId",
  passport.authenticate("jwt", { session: false }),
  updateAppointment
);

router.get("/", getAllRequest);

module.exports = router;
