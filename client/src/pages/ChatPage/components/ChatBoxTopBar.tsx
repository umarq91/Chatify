import { IoArrowBack } from "react-icons/io5";

interface Props {
  avatar: string;
  username: string;
  onlineStatus: string; // TODO add online status
  setSelectedChat: (chat: any) => void;
}
const ChatBoxTopBar = ({
  avatar,
  username,
  onlineStatus,
  setSelectedChat,
}: Props) => {
  return (
    <div className="w-full flex items-center h-auto py-2 bg-[#17191C] ">
            <div
        onClick={() => {
          setSelectedChat(null);
        }}
        className="mt-2  cursor-pointer p-2"
      >
        <div className="flex items-center gap-1 ">
          <IoArrowBack size={20} />
        </div>
      </div>

      <img className="h-10 w-10" src={avatar} alt="" />

      <div className="flex flex-col -gap-2 ml-2 justify-center">
      <h2 className="font-bold text-md">{username}</h2>
      <p className="block text-xs text-[#747881]">{onlineStatus}</p>
      </div>
  
    </div>
  );
};

export default ChatBoxTopBar;
