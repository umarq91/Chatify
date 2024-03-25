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

module.exports=  {accessChat,fetchChats}