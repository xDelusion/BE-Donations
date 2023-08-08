const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    civilid: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default: "/",
    },
    bloodType: String,
    lastDonation: Date,
    phone: { type: Number, unique: true, required: true },
    dob: Date,
    heroList: Boolean,
    noOfDonations: Number,
    isEmp: Boolean,
    emp_no: Number,
    isDonor: Boolean,

    //retlations
    donor_req_id: { type: Schema.Types.ObjectId, ref: "DonorRequest" },
    recipients: [{ type: Schema.Types.ObjectId, ref: "Recipient" }],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
