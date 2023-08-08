const Recipient = require("../../models/RecipientRequest");

exports.getRecipientReqs = async (req, res, next) => {
  try {
    const recipients = await Recipient.find().populate("donor_id recipients");
    return res.status(200).json(recipients);
  } catch (err) {
    next(err);
  }
};

exports.fetchRecipients = async (recipientId) => {
  const foundRecipient = await Recipient.findById(recipientId).populate(
    "donor_id recipients"
  );
  return foundRecipient;
};

exports.addRecipient = async (req, res, next) => {
  try {
    if (!req.user.admin) {
      return next(err);
    }
    const recipient = await Recipient.create({ name });
    res.status(201).json(recipient);
  } catch (error) {
    next(error);
  }
};
