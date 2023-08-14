const Appointment = require("../../models/Appointment");

exports.addAppointment = async (req, res, next) => {
  try {
    req.body.donor_req_id = req.user.donor_req_id;
    req.body.recipientReqId = req.user.recipient_req_id;

    req.body.user_id = await User.findById(req.user._id);
    req.body.confirmed = false;

    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

exports.getAppointment = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await Appointment.find()
      .populate("user_id")
      .select("-__v");

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const { recipientId } = req.params;
    const updatedRecipient = await RecipientRequest.find(recipientId);
    if (updatedRecipient.noOfBloodBags > 0) {
      req.body.noOfBloodBags = updatedRecipient.noOfBloodBags - 1;
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedAppointment);
    } else {
      res.status(400).json({ message: "No more blood bags available" });
    }
  } catch (error) {
    next(error);
  }
};
