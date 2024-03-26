import { CiChat1 } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import ChatBox from "../layouts/ChatBox";

interface Props {
    selectedChat: any
    setSelectedChat: any
}
const RightSide = ({selectedChat, setSelectedChat}:Props) => {
  return (
    <div
    className={`flex-1 md:block bg-[#1C1E22] h-screen overflow-y-auto text-white ${
      selectedChat ? "block" : "hidden"
    }`}
  >
    {selectedChat ? (
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
        <ChatBox />
      </div>
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
