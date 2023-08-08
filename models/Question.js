const { model, Schema } = require("mongoose");

const questionSchema = new Schema(
  {
    qName: [{ type: String,required: true }],
  },

  { timestamps: true }
);

module.exports = model("Question", questionSchema);
