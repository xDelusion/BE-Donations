const { model, Schema } = require("mongoose");

const staffSchema = new Schema(
  {
    empNo: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    name: String,
    civilid: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: Number,
  },

  { timestamps: true }
);

module.exports = model("Staff", staffSchema);
