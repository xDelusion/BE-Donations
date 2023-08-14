const { model, Schema } = require("mongoose");

const donorRequestSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },

    //retlations
    recipient_id: { type: Schema.Types.ObjectId, ref: "Recipient" },
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
