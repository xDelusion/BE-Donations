const { model, Schema } = require("mongoose");

const recipientRequestSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    civilid: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default: "/",
    },

    bloodType: String,
    noOfBloodBags: Number,
    bbFile_no: Number,
    phone: Number,
    dob: Date,
    hospital_id: { type: Schema.Types.ObjectId, ref: "Hospital" },
    urgent: Boolean,
    //retlations
    donor_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
    recipients: [{ type: Schema.Types.ObjectId, ref: "Recipient" }],
  },
  { timestamps: true }
);

module.exports = model("RecipientRequest", recipientRequestSchema);
