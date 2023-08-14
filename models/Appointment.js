const { model, Schema } = require("mongoose");

const appointmentSchema = new Schema(
  {
    appoitment_dte: Date,
    confirmed: Boolean,
    donor_req_id: { type: String, required: true },
    recipientReqId: { type: String, required: true },
    //relations
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Appointment", appointmentSchema);
