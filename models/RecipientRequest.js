const { model, Schema } = require("mongoose");

const recipientRequestSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    civilid: { type: String, unique: true, required: true },
    serial_no: String,
    bloodType: String,
    noOfBloodBags: Number,
    bbFile_no: Number,
    dob: Date,
    urgent: Boolean,
    //retlations
    donor_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("RecipientRequest", recipientRequestSchema);
