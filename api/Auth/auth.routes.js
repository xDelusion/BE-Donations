const express = require("express");
const {
  getAllUsers,
  login,
  register,
  updateUser,
  deleteUser,
  deleteAll,
  getMe,
} = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const uploader = require("../../middlewares/uploader");

const { param } = require("../../utils/params/param");

const jwtAuthenticate = passport.authenticate("jwt", { session: false });
const localAuthenticate = passport.authenticate("local", { session: false });

router.param("userId", param);
router.get("/me", jwtAuthenticate, getMe);
router.get("/getusers", getAllUsers);

router.post("/register/donor", (req, res, next) => {
  req.body.userType = "donor";
  register(req, res, next);
});
router.post("/register/admin", register);

router.post("/login", localAuthenticate, login);
router.put("/", jwtAuthenticate, updateUser);
router.delete("/:userId", jwtAuthenticate, deleteUser);

router.delete("/", jwtAuthenticate, deleteAll);

module.exports = router;
