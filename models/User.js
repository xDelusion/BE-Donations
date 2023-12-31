const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    name: { type: String, required: true },
    civilid: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default: "/",
    },
    bloodType: String,
    lastDonation: Date,
    phone: { type: Number, unique: true, required: true },
    dob: String,
    heroList: Boolean,
    noOfDonations: Number,
    isEmp: Boolean,
    emp_no: Number,
    isDonor: Boolean,
    matchingTypes: [{ type: String }],
    //retlations
    donor_req_id: { type: Schema.Types.ObjectId, ref: "DonorRequest" },
    recipients: [{ type: Schema.Types.ObjectId, ref: "RecipientRequest" }],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
