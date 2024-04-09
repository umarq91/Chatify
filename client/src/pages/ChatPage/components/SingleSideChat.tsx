import { useState, useContext, ReactEventHandler } from "react";
import { chatContext } from "@/context/ChatContext";
import { UserContext } from "@/context/userContext";
import { format } from "timeago.js";
import SocketContext from "@/context/socketContext";
import { FaChevronDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkSender } from "@/config/helpers";
import axios from "axios";
import { toast } from "sonner";

interface SideChatProps {
  chat: any;
}

const SideSingleChat = ({ chat }: SideChatProps) => {
  const { selectedChat, setSelectedChat }: any = useContext(chatContext);
  const { user }: any = useContext(UserContext);
  const { onlineUsers }: any = useContext(SocketContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(" ")}...`;
    }
    return text;
  };

  const truncatedMessage = truncateText(chat?.latestMessage?.content || "", 32);

  const handleSelectChat = () => {
    setSelectedChat(chat);
  };

  const getAvatar = () => {
    return chat.isGroupChat ? chat.chatName : checkSender(user._id, chat.users)?.avatar;
  };

  const getUsername = () => {
    return chat.isGroupChat ? chat.chatName : checkSender(user._id, chat.users)?.username;
  };

  const getUserId = () => {
    return chat.isGroupChat ? chat.chatName : checkSender(user._id, chat.users)._id;
  };

  const isOnline = () => {
    return onlineUsers?.includes(getUserId());
  };


  // for both single and group chat
  const leaveChat = async() => {
    // console.log(chat.isGroupChat ? "leave group chat" : "leave single chat");
try {
  const res = await axios.put('/api/chat/leaveChat', {
    chatId: chat._id
  })
  
  

} catch (error) {
  console.log(error);
  toast.error("Something went wrong");  
}
  
    
  }
  return (
    <div
      onClick={handleSelectChat}
      className={`w-full my-2 py-3 group relative hover:bg-[#272A30] cursor-pointer bg-[#17191C] rounded-lg transition-all ${
        selectedChat?._id === chat._id ? "bg-[#272A30]" : "bg-[#17191C]"
      }`}
    >
      <div className="flex justify-between items-center h-full w-full px-1">
        <div className="flex w-full items-center gap-3">
          <img
            src={!chat.isGroupChat ? getAvatar() : "https://via.placeholder.com/50"}
            className="w-12 h-12 object-cover rounded-full"
            alt={chat.isGroupChat ? chat.chatName : getUsername()}
          />
          <div className="flex flex-col w-full">
            <h2 className="text-lg">{getUsername()}</h2>
            {isOnline() && <span className="absolute top-4 left-11 h-2 w-2 rounded-full bg-green-500"></span>}
            <div className="flex justify-between items-center w-full">
              <p className="text-xs w-[80%] tracking-wide truncate line-clamp-1 text-gray-500">{truncatedMessage || "Start chat"}</p>
              <span className="text-[10px] text-right text-gray-600">{chat?.latestMessage?.createdAt ? format(chat?.latestMessage?.createdAt) : ""}</span>
            </div>
          </div>
        </div>
        <div className="relative mt-5">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger>

              {chat.isGroupChat ?
               <IoMdArrowRoundBack onClick={() => setDropdownOpen(!dropdownOpen)} className="ml-2 cursor-pointer hidden group-hover:block mt-1" size={15} /> : 
              <MdDelete onClick={() => setDropdownOpen(!dropdownOpen)} className="ml-2 cursor-pointer hidden group-hover:block mt-1" size={15} />}
              
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute top-full left-0">
              <DropdownMenuItem 
              onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering handleSelectChat
                  leaveChat();
                }}
              > {chat.isGroupChat ? "Leave group" : "Delete Chat"} </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SideSingleChat;
