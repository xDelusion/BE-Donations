const { model, Schema } = require("mongoose");

const questionSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = model("Question", questionSchema);
