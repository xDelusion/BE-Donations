const { model, Schema } = require("mongoose");

const appointmentSchema = new Schema(
  {
    appoitment_dte: Date,
    appoitment_time: Date,
    email: { type: String, unique: true },
    name: { type: String, required: true },
    civilid: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    userid: { type: String, required: true },
    confirmed: { type: Boolean, required: true },
    donor_req_id: { type: String, required: true },
    recipientReqId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Appointment", appointmentSchema);
