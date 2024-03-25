import { chatContext } from "@/context/ChatContext";
import { useContext } from "react";
import { checkSender } from "@/config/helpers.js";
import { UserContext } from "@/context/userContext";

interface SideChatProps {
  chat: any;
}

const SideSingleChat = ({ chat }: SideChatProps) => {
  const { setSelectedChat }:any = useContext(chatContext);
  const { user }:any = useContext(UserContext);
  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(" ")}...`;
    }
    return text;
  };

  // Truncate the last message to a maximum of 32 words
  const truncatedMessage = truncateText(chat?.lastMessage || "", 32); // Handle missing lastMessage

  const handleSelectChat = () => {
    setSelectedChat(chat); // Set the selected chat ID
  };

  const getAvatar = () => {
    if (chat.isGroupChat) {
      return chat.chatName; // Use chat name for group avatar (if available)
    } else {
      // Assuming checkSender returns user object with avatar property
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

  return (
    <div
      onClick={handleSelectChat}
      className="h-16 w-full px-4 hover:bg-[#272A30] cursor-pointer bg-[#17191C] transition-all"
    >
      <div className="flex justify-between items-center h-full">
        <div className="flex w-full items-center gap-3">
          <img
            src={getAvatar()}
            className="w-12 h-12 object-cover rounded-full"
            alt={chat.isGroupChat ? chat.chatName : getUsername()} // Set alt text
          />
          <div className="flex w-full flex-col">
            <h2 className="text-lg">{getUsername()}</h2>
            <div className={`flex justify-between w-full ${"umer" ? "text-white" : "text-[#747881]"}`}>
              <p className={`text-xs w-[80%] tracking-wide truncate line-clamp-1`}>
                {truncatedMessage}
              </p>
              <span className="text-xs">{chat?.time || ""}</span> {/* Display time if available */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSingleChat;
