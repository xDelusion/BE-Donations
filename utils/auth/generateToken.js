const jwt = require("jsonwebtoken");
const config = require("../../config/keys");

module.exports = (user, next) => {
  const payload = {
    _id: user._id,
    civilid: user.civilid,
  };
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_TOKEN_EXP,
  });
  return token;
};
