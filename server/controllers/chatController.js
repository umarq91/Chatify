const UserModel = require("../models/User.js");
const { customError } = require("../utils/CustomError.js");
const Chat = require("../models/ChatModel.js");
const asyncHandler = require("express-async-handler");
 
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if(!userId) {
        console.log("UserId param not sent with request");
        return next(customError(400, "User Id not sent with request"));
    }

    // Find the chat , if it exists return that , else create a new chat

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users:{ $elemMatch: { $eq: req.user._id } } },
            { users:{ $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
            .populate("latestMessage");

        isChat = await UserModel.populate(isChat, {
            path:'latestMessage.sender',
            select:"username avatar email",
        });

        if (isChat.length > 0){
            res.send(isChat[0]);
        } else {
            let chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };

            try {
                const createdChat = await Chat.create(chatData);

                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                    "users",
                    "-password"
                );

                res.status(200).send(FullChat);
            } catch (error) {
                res.status(400);
                throw new Error(error.message);
            }
        }
});

const fetchChats = asyncHandler(async (req, res) => {
    
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async(results)=>{
            results = await UserModel.populate(results, {
               path:"latestMessage.sender",
               select:"username avatar email", 
            })
            res.status(200).send(results);
        })
})


const createGroupChat = asyncHandler(async (req, res) => {
  try {
  if (!req.body.users || !req.body.name) {
    return next(customError(400, "Please fill all the fields"));
  }

  let users = req.body.users;
  if (users.length < 2) {
    
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fetchGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fetchGroupChat);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});


const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName: chatName },
    { new: true }
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

    if(!updatedChat) {
    res.status(404);
    throw new Error("Chat not found")
    }else{
        res.status(200).json(updatedChat);
    }
})

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  ).populate("users", "-password")
  .populate("groupAdmin", "-password");

    if(!added) {
    res.status(404);
    throw new Error("Chat not found")
    }else{
        res.status(200).json(added);
    }

})

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )

  if(!removed) {
    res.status(404);
    throw new Error("Chat not found")
    }else{
        res.status(200).json(removed);
    }
})

module.exports=  {accessChat,fetchChats, createGroupChat,renameGroup,addToGroup,removeFromGroup}