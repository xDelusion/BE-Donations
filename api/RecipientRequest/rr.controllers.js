const RecipientRequest = require("../../models/RecipientRequest");
const User = require("../../models/User");

exports.getRecipientReqs = async (req, res, next) => {
  try {
    const recipients = await RecipientRequest.find().populate("donor_id");
    return res.status(200).json(recipients);
  } catch (err) {
    next(err);
  }
};
exports.getRecipientReqsBYID = async (req, res, next) => {
  try {
    const recipients = await RecipientRequest.findById(req.params._id).populate(
      "donor_id"
    );
    return res.status(200).json(recipients);
  } catch (err) {
    next(err);
  }
};

exports.fetchRecipients = async (recipientId) => {
  const foundRecipient = await RecipientRequest.findById(recipientId).populate(
    "donor_id"
  );
  return foundRecipient;
};

exports.addRecipient = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);
    if (me.isEmp == false) {
      return res
        .status(403)
        .json({ message: "You are not authorized to add a recipient request" });
    }

    const recipient = await RecipientRequest.create(req.body);
    res.status(201).json(recipient);
  } catch (error) {
    next(error);
  }
};
