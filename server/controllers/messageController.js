const asyncHandler = require("express-async-handler");
const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/User");
const ChatModel = require("../models/ChatModel"); // Assuming you have a Chat model

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const { _id: senderId } = req.user;

  try {
    let newMessage = await MessageModel.create({
      sender: senderId,
      content: content,
      chat: chatId
    });


    newMessage = await newMessage.populate("sender", "username avatar")

    newMessage = await MessageModel.findById(newMessage._id).populate("chat")

    newMessage = await UserModel.populate(newMessage, {
      path: "chat.users",
      select: "username avatar email"
    });

    // Update latest message in the associated chat
    await ChatModel.findByIdAndUpdate(chatId, { latestMessage: newMessage });

    res.json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(error);
  }
});


const fetchMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageModel.find({ chat: chatId })
      .populate("sender", "username avatar email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error(error);
  }
})

module.exports = { sendMessage,fetchMessages };
