const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    user_id: { type: String },
    chats: [
      {
        user: { message: { type: String }, timestamp: { type: Date } },
        bot: { message: { type: String }, timestamp: { type: Date } },
      },
    ],
    rating: { type: String },
  },
  { timestamps: true }
);

//exporting module
module.exports = mongoose.model("Chat", chatSchema);
