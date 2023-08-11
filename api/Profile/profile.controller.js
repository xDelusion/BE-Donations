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
      civilid:req.body.civilid,
      name: req.body.name,
      dob: req.body.dob,
      phone: req.body.phone,
      bloodType: req.body.bloodType,
      noOfDonations: req.body.noOfDonations,

    });

    return res.status(201).json({
      _id: req.user._id,
      image: req.user.image,
      civilid:req.user.civilid,
      name: req.user.name,
      dob: req.user.dob,
      phone: req.user.phone,
      bloodType: req.user.bloodType,
      noOfDonations: req.user.noOfDonations,
    });
  } catch (error) {
    next(error);
  }
};
