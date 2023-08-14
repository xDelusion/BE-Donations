const User = require("../../models/User");

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await User.findById(req.user._id)
      .populate("donor_req_id recipients")
      .select("-password");
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace("\\", "/");
    }

    await req.user.updateOne({
      image: req.body.image,

      phone: req.body.phone,
      email: req.body.email,
    });

    return res.status(201).json({
      _id: req.user._id,
      image: req.user.image,

      phone: req.user.phone,

      email: req.user.email,
    });
  } catch (error) {
    next(error);
  }
};
