import { CiChat1 } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import ChatBox from "../layouts/ChatBox";
import { checkSender } from "@/config/helpers";
import { useUser } from "@/context/userContext";
import ChatBoxTopBar from "../components/ChatBoxTopBar";


interface Props {
    selectedChat: any
    setSelectedChat: any
}
const RightSide = ({selectedChat, setSelectedChat}:Props) => {
  
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
            {selectedChat.isGroupChat ? (
              <h2>{selectedChat.chatName}</h2>
            ) : (
              
            <ChatBoxTopBar
            avatar={checkSender(user._id, selectedChat.users)?.avatar}
            username={checkSender(user._id, selectedChat.users)?.username}
            onlineStatus={"Online for 10 minutes"}
            setSelectedChat={setSelectedChat}
            
          />
              
            )}
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
