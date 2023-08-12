const { model, Schema } = require("mongoose");

const donorRequestSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },

    //retlations
    QA: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("DonorRequest", donorRequestSchema);
