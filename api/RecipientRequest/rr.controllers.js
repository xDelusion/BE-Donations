const Recipient = require("../../models/RecipientRequest");
const User = require("../../models/User");

exports.getRecipientReqs = async (req, res, next) => {
  try {
    const recipients = await Recipient.find().populate("donor_id recipients");
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

    const recipient = await Recipient.create(req.body);
    res.status(201).json(recipient);
  } catch (error) {
    next(error);
  }
};
