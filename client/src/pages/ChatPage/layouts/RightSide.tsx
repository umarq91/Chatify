import { CiChat1 } from "react-icons/ci";
import ChatBox from "../layouts/ChatBox";
import { checkSender } from "@/config/helpers";
import { useUser } from "@/context/userContext";
import ChatBoxTopBar from "../components/ChatBoxTopBar";
import SocketContext from "@/context/socketContext";
import { useContext } from "react";
interface Props {
    selectedChat: any
    setSelectedChat: any
}

const RightSide = ({selectedChat, setSelectedChat}:Props) => {
  const {onlineUsers} = useContext(SocketContext)
const {user}:any = useUser()


  return (
    <div
      className={`flex-1 md:block bg-[#1C1E22]   h-full  text-white ${
        selectedChat ? "block" : "hidden"
      }`}
    >
      {selectedChat ? (
        <>
          <div className="flex gap-2 ">
            {
            <ChatBoxTopBar
            isGroupChat={selectedChat.isGroupChat}
            avatar={ !selectedChat.isGroupChat ?  checkSender(user._id, selectedChat.users)?.avatar : "https://freeiconshop.com/wp-content/uploads/edd/many-people-outline.png"}
            username={ !selectedChat.isGroupChat ? checkSender(user._id, selectedChat.users)?.username : selectedChat.chatName}
            onlineStatus={onlineUsers.includes(checkSender(user._id, selectedChat.users)._id)}
            setSelectedChat={setSelectedChat}
            members={selectedChat.users}
          /> } 
          </div>
    
          <ChatBox />
        </>
      ) : (
        <div className="flex flex-col justify-center w-full items-center h-screen opacity-60 ">
          <CiChat1 className=" text-[4rem]" />
          <h1 className="text-lg"> Chat not selected</h1>
        </div>
      )}
    </div>
  );
}

export default RightSide
