const { model, Schema } = require("mongoose");

const donorRequestSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },

    //retlations
    donor_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
    QA: [
      {
        question_id: { type: Schema.Types.ObjectId, ref: "Question" },
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("DonorRequest", donorRequestSchema);
