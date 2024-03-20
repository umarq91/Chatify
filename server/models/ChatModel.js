const mongoose = requuire("mongoose")

const ChatModelSchema = mongoose.Schema({
    chatName : {
        type: String,
        trim: true
    },
    isGroupChat : {
        type: Boolean,
        default: false
    },
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    latestMessage : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{ timeStamps: true }

)

const Chat = monogoose.model("Chat", ChatModelSchema)

module.exports= Chat