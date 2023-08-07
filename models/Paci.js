const { model, Schema } = require("mongoose");

const paciSchema = new Schema(
  {
    civilid: { type: String, unique: true, required: true },
    name: String,
    bloodType: String,
    dob: Date,
  },
  { timestamps: true }
);

module.exports = model("Paci", paciSchema);
