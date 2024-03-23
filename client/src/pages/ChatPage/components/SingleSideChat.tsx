import { chatContext } from "@/context/ChatContext";
import { useContext } from "react";

interface SideChatProps{
    profile:string,
    name:string,
    lastMessage:string,
    time:any,
    active:boolean
}

const SideSingleChat = ({profile,name,lastMessage,time,active}:SideChatProps) => {
  const   {setSelectChat}:any = useContext(chatContext);
  

  const truncateText = (text:string, maxWords:number) => {
    const words = text.split('');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join('') + '...';
    }
    return text;
  };


  // Truncate the last message to a maximum of 40 words
  const truncatedMessage = truncateText(lastMessage, 32);


  
const handleSelectChat = ()=>{
  // set the ID of the selected Chat ( ID from databse )
  setSelectChat(name);

}
  return (
    <div 
    onClick={handleSelectChat}
    className="h-16  w-full px-4 hover:bg-[#272A30] cursor-pointer bg-[#17191C] transition-all">
      <div className="flex   justify-between items-center h-full ">
        <div className="flex w-full items-center gap-3">
          <img
            src={profile}
            className="w-12 h-12 object-cover rounded-full"
            />
            <div className="flex w-full flex-col">
            <h2 className="text-lg"> {name}</h2>
            <div className={`flex justify-between  w-full ${active ? 'text-white' : 'text-[#747881]' } `}> 
            <p className={`text-xs w-[80%] tracking-wide truncate line-clamp-1 '}`}>{truncatedMessage}</p>
            <span className="text-xs"> {time} </span>
            </div>
            </div>
            </div>
            </div>
    </div>
  )
}

export default SideSingleChat