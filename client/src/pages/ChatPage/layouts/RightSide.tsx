import { CiChat1 } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import ChatBox from "../layouts/ChatBox";
import { checkSender } from "@/config/helpers";
import { useUser } from "@/context/userContext";
import ChatboxChats from "../components/ChatboxChats";

interface Props {
    selectedChat: any
    setSelectedChat: any
}
const RightSide = ({selectedChat, setSelectedChat}:Props) => {
  
const {user}:any = useUser()

  return (
    <div  
    className={`flex-1 md:block bg-[#1C1E22] h-full overflow-y-auto text-white ${
      selectedChat ? "block" : "hidden"
    }`}
  >
    {selectedChat ? (
      <>
      <div className="flex gap-2 p-3">
   {
    selectedChat.isGroupChat ?(
      <h2>{selectedChat.chatName}</h2>
      )
      :
      (
        <>
       <img 
       className="h-8 w-8"
       src={checkSender( user._id,selectedChat.users )?.avatar} alt="" />
        <h2 className="font-bold text-md">{checkSender( user._id,selectedChat.users )?.username}</h2>
    
        <p className="block">Online for 10 minutes</p>
        
        </>
      )
   }
      </div>
      <div
        onClick={() => {
          setSelectedChat(null);
        }}
        className="mt-2 bg-black  cursor-pointer p-2"
        >
        <div className="flex items-center gap-1">
          <IoArrowBack />
          Back
        </div>
      
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
  )
}

export default RightSide
