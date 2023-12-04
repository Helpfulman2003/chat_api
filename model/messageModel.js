const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        require: true,
      },
    },
    user: Array, // chứa id của 2 người 1 là người gửi 2 là người nhận
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
