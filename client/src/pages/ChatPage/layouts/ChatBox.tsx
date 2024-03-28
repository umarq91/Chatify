import { chatContext } from "@/context/ChatContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SingleMessage from "../components/SingleMessage";
import ChatInput from "../components/ChatInput";

const ChatBox = () => {

  const [messages, setMessage] = useState([]);
  const {selectedChat}:any = useContext(chatContext)

    
useEffect(()=>{

  const fetchMessage=async()=>{

   const {data} = await axios.get('/api/message/'+selectedChat._id)
   console.log(data);
   setMessage(data)
   
  }

  fetchMessage()
},[])

  return (
    <div>
      <div className="h-full overflow-hidden py-4 relative  text-black bg-black">
        <div className="h-full overflow-y-auto">

          {messages.map((message:any) => (
              <SingleMessage
               content={message.content}
               sender={message.sender.username}
               isSenderUser={message.sender._id === selectedChat.users[0]._id} 
               avatar={message.sender.avatar}
               />
          ))}

        

        </div>
      </div>
     <ChatInput/>
    </div>
  );
}

export default ChatBox
