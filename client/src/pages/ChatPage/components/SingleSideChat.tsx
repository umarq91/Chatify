import { chatContext } from "@/context/ChatContext";
import { useContext, useEffect } from "react";
import { checkSender } from "@/config/helpers.js";
import { UserContext } from "@/context/userContext";
import {format} from "timeago.js"
import SocketContext from "@/context/socketContext";
interface SideChatProps {
  chat: any;
}

const SideSingleChat = ({ chat }: SideChatProps) => {
  const {selectedChat, setSelectedChat }:any = useContext(chatContext);
  const { user }:any = useContext(UserContext);
  const {onlineUsers}:any = useContext(SocketContext)
  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(" ")}...`;
    }
    return text;
  };

  
  // Truncate the last message to a maximum of 32 words
  const truncatedMessage = truncateText(chat?.latestMessage?.content || "", 32); // Handle missing lastMessage

  const handleSelectChat = () => {
    setSelectedChat(chat); 
  };

  const getAvatar = () => {
    if (chat.isGroupChat) {
      return chat.chatName; // Use chat name for group
    } else {
      return checkSender(user._id, chat.users)?.avatar;
    }
  };

  const getUsername = () => {
    if (chat.isGroupChat) {
      return chat.chatName;
    } else {
      return checkSender(user._id, chat.users)?.username;
    }
  };

const getUserId=()=>{
  if (chat.isGroupChat) {
    return chat.chatName;
  } else {
    return checkSender(user._id, chat.users)._id;
  }
}

const isOnline = () => {
  return onlineUsers?.includes(getUserId())
}


  return (
    <div
      onClick={handleSelectChat}
      className={` w-full my-2 py-3 relative hover:bg-[#272A30] cursor-pointer bg-[#17191C] rounded-lg transition-all ${selectedChat?._id === chat._id ? "bg-[#272A30]" : "bg-[#17191C] "} `}
    >
      <div className="flex justify-between items-center h-full w-full  px-1">
        <div className="flex w-full items-center gap-3">
          <img
            src={!chat.isGroupChat ? getAvatar() : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKQglNCqZI_Jh-4jTOnQpbMmVD1vhks4r6NYLKH6NWIg&s"}
            className="w-12 h-12 object-cover rounded-full"
            alt={chat.isGroupChat ? chat.chatName : getUsername()} // Set alt text
          />
          <div className="flex w-full flex-col  ">
              
            <h2 className="text-lg">{getUsername()}</h2>
            {isOnline() && <span className="absolute top-4  left-11 h-2 w-2 rounded-full   text-[8px] bg-green-500"></span>} 

                        <div className={`flex justify-around w-full  "}`}>
              <p className={`text-xs w-[80%] tracking-wide truncate line-clamp-1 text-gray-500`}>
                {truncatedMessage || "Start chat"} 
              </p>
              
              <span className="text-[10px] w-full text-right text-gray-600">  {chat?.latestMessage?.createdAt ? format(chat?.latestMessage?.createdAt) : ""}</span> {/* Display time if available */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSingleChat;
