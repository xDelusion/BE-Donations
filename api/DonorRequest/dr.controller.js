const DonorRequest = require("../../models/DonorRequest");
const User = require("../../models/User");
const param = require("../../utils/params/param");
exports.createDonorRequest = async (req, res, next) => {
  try {
    const user = User.find(req.user._id);
    if (user.donor_req_id) {
      return res.status(401).json({ message: "You already have a request" });
    } else {
      console.log(req.body);
      req.body.user_id = req.user._id;
      const newDonorRequest = await DonorRequest.create(req.body);

      await User.findByIdAndUpdate(req.user._id, {
        donor_req_id: newDonorRequest._id,
      });
      return res.status(201).json(newDonorRequest);
    }
  } catch (err) {
    // return res.status(500).json(err.message);
    return next(err);
  }
};

exports.updateDonorRequest = async (req, res, next) => {
  try {
    const { recipientId } = req.params;
    console.log(recipientId);
    const donor_req_id = req.user.donor_req_id;
    const donorRequest = await DonorRequest.findByIdAndUpdate(donor_req_id, {
      recipient_id: recipientId,
    });

    res.status(200).json(donorRequest);
    // const { recipientId } = req.params;
    // const donorRequest = await DonorRequest.findById(req.user_id);
    // if (!donorRequest) {
    //   return res.status(404).json({ message: "Request not Found!" });
    // } else {
    //   const updatedDonorRequest = await DonorRequest.findByIdAndUpdate(
    //     recipientId,
    //     req.body,
    //     { new: true }
    //   );
    //   return res.status(200).json(updatedDonorRequest);
    // }
  } catch (err) {
    return next(err);
  }
};
exports.getDonorRequestByUserId = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);
    const foundDonorRequest = await DonorRequest.findOne({
      user_id: me,
    }).select("-__v");

    if (!foundDonorRequest) {
      res.status(404).json({ message: "Request not Found!" });
    } else {
      res.status(201).json(foundDonorRequest).select("-__v");
      // .populate("Question");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDonorRequestById = async (req, res, next) => {
  try {
    const { donorRequestId } = req.param;
    const foundDonorRequest = await DonorRequest.findById(donorRequestId);

    if (!foundDonorRequest) {
      res.status(404).json({ message: "Request not Found!" });
    } else {
      res.status(201).json(foundDonorRequest).select("-__v");
      // .populate("Question");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllRequest = async (req, res, next) => {
  try {
    const request = await DonorRequest.find();

    return res.status(200).json(request);
  } catch (err) {
    return next(err);
  }
};
