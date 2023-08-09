const User = require("../../models/User");

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await User.findById(req.user._id)
      .populate("DonorRequest ")
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    });

    return res.status(201).json({
      _id: req.user._id,
      username: req.user.username,
      trips: req.user.trips,
      image: req.body.image,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    });
  } catch (error) {
    next(error);
  }
};
