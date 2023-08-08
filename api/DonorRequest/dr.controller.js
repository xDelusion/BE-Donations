const DonorRequest = require("../../models/DonorRequest");
const User = require("../../models/User");
const param = require("../../utils/params/param");
exports.createDonorRequest = async (req, res, next) => {
  try {
    const user = User.find(req.user._id);
    if (user.donor_req_id) {
      return res.status(401).json({ message: "You already have a request" });
    } else {
      const newDonorRequest = await DonorRequest.create(req.body);
      return res.status(201).json(newDonorRequest);
    }
  } catch (err) {
    // return res.status(500).json(err.message);
    return next(err);
  }
};

exports.getDonorRequestById = async (req, res, next) => {
  try {
    const { donorReuestId } = req.param;
    const foundDonorRequest = await DonorRequest.findById(donorReuestId);

    if (!foundDonorRequest) {
      res.status(404).json({ message: "Request not Found!" });
    } else {
      res
        .status(201)
        .json(foundDonorRequest)
        .select("-__v")
        .populate("Question");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
