const mongoose = requuire("mongoose")

const MessageSchema = mongoose.Schema({
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content : {
        type: String,
        trim: true
    },
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
},
{ timeStamps: true }

)

const Message= mongoose.model("Message", MessageSchema)
module.exports = Message