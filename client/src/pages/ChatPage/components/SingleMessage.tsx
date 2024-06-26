import { isLastMessageBySameSender } from "@/config/helpers";
import { format, render, cancel, register } from 'timeago.js';interface Props {
  content: string;
  sender: string;
  isSenderUser: boolean;
  avatar: string;
  messages: any[]; // Array of message objects (assuming your message structure)
  index: number; // Index of the current message in the array
  senderId: string; // ID of the current message sender
  time:any;
}

function SingleMessage({ content, sender, isSenderUser, avatar, messages, index, senderId,time }:Props) {


  
  const showAvatar = isLastMessageBySameSender(messages, index, senderId);

  return (
    <div className="grid grid-cols-12 gap-y-2">
    
    {isSenderUser ? (
 <div className="col-start-1 col-end-8 p-3 rounded-lg">
 <div className="flex flex-row items-center">
   <div className="left w-10 ">
    {showAvatar && (
      <img 
      src={avatar}
      alt="picture"
      className="w-10 h-10 rounded-full"
      />
      )}
    </div>
      <div
          className="relative ml-3 text-sm bg-[#151515] text-white py-2 px-4 shadow rounded-xl"
      >
        <h2 className="text-md">{content}</h2>
        <p className="text-xs">{format(time)}</p>
      </div>
 </div>
</div>

    ):(
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
        <div className="left w-10 justify-end">
    {showAvatar && avatar &&(
      <img 
      src={avatar}
      alt="picture"
      className="w-10 h-10 rounded-full "
      />
      )}
    </div>
          <div
              className="relative mr-3 text-sm bg-[#001A3D] text-white py-2 px-4 shadow rounded-xl"
          >
            <div>{content}</div>
            <p className="text-xs">{format(time)}</p>
          </div>
        </div>
      </div>
    )}
    </div>
  
  )
}

export default SingleMessage
