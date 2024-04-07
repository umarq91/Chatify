import { IoArrowBack } from "react-icons/io5";
import {
  DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
   DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { SlOptionsVertical } from "react-icons/sl";
interface Props {
  avatar: string;
  isGroupChat: boolean;
  username: string;
  onlineStatus: boolean; // TODO add online status
  setSelectedChat: (chat: any) => void;
  members: any;
}
const ChatBoxTopBar = ({
  avatar, username, onlineStatus, isGroupChat,setSelectedChat,members}: Props) => {



  return (
    <div className="w-full flex justify-between py-2 pr-10 items-center bg-[#17191C] ">

      <div className="flex items-center h-auto">
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
      <p className="block text-xs text-[#747881]">{isGroupChat ? ` You and ${members.length-1} others` : onlineStatus ? "Online" : "Offline"}</p>
      </div>
      </div>
     
     <div>

      {isGroupChat && (
           <DropdownMenu>
           <DropdownMenuTrigger> <SlOptionsVertical /> </DropdownMenuTrigger>
           <DropdownMenuContent>
             <DropdownMenuLabel>Settings</DropdownMenuLabel>
             <DropdownMenuSeparator />
             
             <DropdownMenuItem className="cursor-pointer">Add members</DropdownMenuItem>
             <DropdownMenuItem className="cursor-pointer">Rename Group</DropdownMenuItem>
             <DropdownMenuItem className="cursor-pointer">Delete Group</DropdownMenuItem>
         
           </DropdownMenuContent>
         </DropdownMenu>
      )}
   
     </div>

    </div>
  );
};

export default ChatBoxTopBar;
